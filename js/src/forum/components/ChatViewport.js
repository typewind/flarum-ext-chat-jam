import Component from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

import Message from '../models/Message';
import ChatState from '../states/ChatState';

export default class ChatViewport extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.model = this.attrs.model;
        this.state = ChatState.getViewportState(this.model);

        this.messageCharLimit = app.forum.attribute('pushedx-chat.settings.charlimit') ?? 512;
        if (!app.session.user) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.unauthenticated');
        else if (!ChatState.getPermissions().post) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.chatdenied');
        else if (this.model.removed_at()) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.removed');
        else this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.chat.placeholder');

        ChatState.evented.on('onChatChanged', this.onChatChanged.bind(this));
        ChatState.evented.on('onClickMessage', this.onChatMessageClicked.bind(this));
    }

    onbeforeupdate(vnode) {
        super.onbeforeupdate(vnode);

        this.model = this.attrs.model;
        this.state = ChatState.getViewportState(this.model);

        if (!app.session.user) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.unauthenticated');
        else if (!ChatState.getPermissions().post) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.chatdenied');
        else if (this.model.removed_at()) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.removed');
        else this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.chat.placeholder');
    }

    onupdate(vnode) {
        //ChatState.colorizeOddChatMessages();
    }

    view(vnode) {
        return (
            <div>
                <div
                    className="wrapper"
                    oncreate={this.wrapperOnCreate.bind(this)}
                    onupdate={this.wrapperOnUpdate.bind(this)}
                    onscroll={this.wrapperOnScroll.bind(this)}
                    onwheel={this.wrapperOnMouseWheel.bind(this)}
                    style={{ height: ChatState.getFrameState('transform').y + 'px' }}
                >
                    {this.componentLoader(this.state.scroll.loading.all)}
                    {ChatState.componentsChatMessages().concat(
                        this.state.input.writingPreview ? ChatState.componentChatMessage(this.state.input.previewModel) : []
                    )}
                </div>
                <div className="input-wrapper">
                    <textarea
                        id="chat-input"
                        maxlength={this.messageCharLimit}
                        disabled={!ChatState.getPermissions().post || this.model.removed_at()}
                        placeholder={this.inputPlaceholder}
                        onkeypress={this.inputPressEnter.bind(this)}
                        oninput={this.inputProcess.bind(this)}
                        onpaste={this.inputProcess.bind(this)}
                        rows={this.state.input.rows}
                    />
                    {this.state.messageEditing ? (
                        <div className="icon edit" onclick={this.messageEditEnd.bind(this)}>
                            <i class="fas fa-times"></i>
                        </div>
                    ) : null}
                    <div className="icon send" onclick={this.inputPressButton.bind(this)}>
                        <i class="fas fa-angle-double-right"></i>
                    </div>
                    <div
                        id="chat-limitter"
                        className={this.reachedLimit() ? 'reaching-limit' : ''}
                        style={{ display: !ChatState.getPermissions().post ? 'none' : '' }}
                    >
                        {this.messageCharLimit - (this.state.input.messageLength || 0) + '/' + this.messageCharLimit}
                    </div>
                </div>
                {this.isFastScrollAvailable() ? this.componentScroller() : null}
            </div>
        );
    }

    componentScroller() {
        return (
            <div className="scroller" onclick={this.fastScroll.bind(this)}>
                <i class="fas fa-angle-down"></i>
            </div>
        );
    }

    componentLoader(watch) {
        return watch ? (
            <msgloader className="message-wrapper--loading">
                <LoadingIndicator className="loading-old Button-icon" />
            </msgloader>
        ) : null;
    }

    getChat() {
        return document.querySelector('.neonchat');
    }

    getChatHeader() {
        return document.querySelector('.neonchat #chat-header');
    }

    getChatInput() {
        return document.querySelector('.neonchat #chat-input');
    }

    getChatsList() {
        return document.querySelector('.neonchat #chats-list');
    }

    getChatWrapper() {
        return document.querySelector('.neonchat .wrapper');
    }

    reachedLimit() {
        this.oldReached = this.messageCharLimit - (this.state.input.messageLength || 0) < 100;
        return this.oldReached;
    }

    isFastScrollAvailable() {
        let chatWrapper = this.getChatWrapper();
        return (
            this.model.unreaded() >= 30 || (chatWrapper && chatWrapper.scrollHeight > 2000 && chatWrapper.scrollTop < chatWrapper.scrollHeight - 2000)
        );
    }

    fastScroll(e) {
        if (this.model.unreaded() >= 30) this.fastMessagesFetch(e);
        else {
            let chatWrapper = this.getChatWrapper();
            chatWrapper.scrollTop = Math.max(chatWrapper.scrollTop, chatWrapper.scrollHeight - 3000);
            this.scrollToBottom();
        }
    }

    fastMessagesFetch(e) {
        e.redraw = false;
        ChatState.chatmessages = [];

        ChatState.apiFetchChatMessages(this.model).then((r) => {
            this.scrollToBottom();
            this.timedRedraw(300);

            this.model.pushAttributes({ unreaded: 0 });
            let message = ChatState.getChatMessages((mdl) => mdl.chat() == this.model).slice(-1)[0];
            ChatState.apiReadChat(this.model, message);
        });
    }

    wrapperOnCreate(vnode) {
        super.oncreate(vnode);
        this.wrapperOnUpdate(vnode);
    }

    wrapperOnUpdate(vnode) {
        let el = vnode.dom;
        if (this.model && this.state.scroll.autoScroll) {
            if (this.autoScrollTimeout) clearTimeout(this.autoScrollTimeout);
            this.autoScrollTimeout = setTimeout(this.scrollToBottom.bind(this), 100);
        }
        if (el.scrollTop <= 0) el.scrollTop = 1;
        this.checkUnreaded();
    }

    wrapperOnScroll(e) {
        e.redraw = false;
        let el = e.target;

        this.state.scroll.autoScroll = el.scrollTop + el.offsetHeight >= el.scrollHeight - 10;
        this.state.scroll.oldScroll = el.scrollTop;

        if (el.scrollTop <= 0) el.scrollTop += 1;
        else if (el.scrollTop + el.offsetHeight >= el.scrollHeight) el.scrollTop -= 1;

        this.checkUnreaded();

        if (this.lastFastScrollStatus != this.isFastScrollAvailable()) {
            this.lastFastScrollStatus = this.isFastScrollAvailable();
            m.redraw();
        }
    }

    checkUnreaded() {
        let wrapper = this.getChatWrapper();
        if (wrapper && this.model.unreaded()) {
            let list = ChatState.getChatMessages((mdl) => mdl.chat() == this.model && mdl.created_at() >= this.model.readed_at() && !mdl.isReaded);

            for (const message of list) {
                let msg = document.querySelector(`.message-wrapper[data-id="${message.id()}"`);
                if (msg && wrapper.scrollTop + wrapper.offsetHeight >= msg.offsetTop) {
                    message.isReaded = true;

                    if (this.state.scroll.autoScroll && ChatState.getCurrentChat() == this.model) {
                        ChatState.apiReadChat(this.model, new Date());
                        this.model.pushAttributes({ unreaded: 0 });
                    } else {
                        ChatState.apiReadChat(this.model, message);
                        this.model.pushAttributes({ unreaded: this.model.unreaded() - 1 });
                    }

                    m.redraw();
                }
            }
        }
    }

    wrapperOnMouseWheel(e) {
        e.redraw = false;

        let el = this.element;
        let currentHeight = el.scrollHeight;

        if (this.state.scroll.autoScroll) this.state.scroll.needToScroll = false;
        if (this.state.scroll.needToScroll) this.scrollToBottom();

        if (!this.state.messageEditing && this.state.scroll.oldScroll >= 0) {
            if (el.scrollTop <= 500) {
                let topMessage = ChatState.getChatMessages((model) => model.chat() == this.model)[0];
                if (topMessage && topMessage != this.model.first_message())
                    ChatState.apiFetchChatMessages(this.model, topMessage.created_at().toISOString());
            } else if (el.scrollTop + el.offsetHeight >= currentHeight - 500) {
                let bottomMessage = ChatState.getChatMessages((model) => model.chat() == this.model).slice(-1)[0];
                if (bottomMessage && bottomMessage != this.model.last_message())
                    ChatState.apiFetchChatMessages(this.model, bottomMessage.created_at().toISOString());
            }
        }
    }

    scrollToAnchor(anchor) {
        let scroll = () => {
            let element;
            if (anchor instanceof Message) element = $(`.message-wrapper[data-id="${anchor.id()}"`)[0];
            else element = anchor;

            let chatWrapper = this.getChatWrapper();
            if (chatWrapper && element)
                $(chatWrapper)
                    .stop()
                    .animate({ scrollTop: element.offsetTop - element.offsetHeight }, 500);
            else setTimeout(scroll, 100);
        };
        scroll();
    }

    scrollToBottom() {
        let chatWrapper = this.getChatWrapper();
        if (chatWrapper) {
            if (chatWrapper.scrollTop + chatWrapper.offsetHeight >= chatWrapper.scrollHeight - 1) return;

            $(chatWrapper).stop().animate({ scrollTop: chatWrapper.scrollHeight }, 500);
            if (!this.state.scroll.autoScroll) this.state.scroll.needToScroll = true;
        }
    }

    inputClear() {
        input.value = '';
    }

    inputSyncWithPreview() {
        let input = this.getChatInput();
        if (this.state.input.content) {
            input.value = this.state.input.content;
            this.inputProcess();
        } else input.value = '';
    }

    inputProcess(e) {
        if (e) e.redraw = false;

        let input = this.getChatInput();
        let inputValue = input.value.trim();
        this.state.input.messageLength = inputValue.length;
        this.state.input.content = inputValue;

        /*
        if(!input.baseScrollHeight)
        {
            input.baseScrollHeight = input.scrollHeight;
            input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
        }

        input.rows = 1;
        let rows = Math.ceil((input.scrollHeight - input.baseScrollHeight) / input.lineHeight) + 1;
        this.state.input.rows = rows;
        input.rows = rows;
        */

        if (!input.lineHeight) input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
        input.rows = 1;
        input.rows = input.scrollHeight / input.lineHeight;

        if (this.state.input.messageLength) {
            if (!this.state.input.writingPreview && !this.state.messageEditing) this.inputPreviewStart(inputValue);
        } else {
            if (this.state.input.writingPreview && !inputValue.length) this.inputPreviewEnd();
        }

        if (this.state.messageEditing) this.state.messageEditing.content = inputValue;
        else if (this.state.input.writingPreview) this.state.input.previewModel.content = inputValue;
        this.timedRedraw(100, () => (this.state.scroll.autoScroll && !this.state.messageEditing ? this.scrollToBottom() : null));
    }

    inputPressEnter(e) {
        e.redraw = false;
        if (e.keyCode == 13 && !e.shiftKey) {
            this.messageSend(this.getChatInput().value);
            return false;
        }
        return true;
    }

    inputPressButton() {
        this.messageSend(this.getChatInput().value);
    }

    inputClear() {
        this.state.input.messageLength = 0;
        this.state.input.rows = 1;
        this.state.input.content = '';

        let input = this.getChatInput();
        input.value = '';
        input.rows = 1;
    }

    inputPreviewStart(content) {
        if (!this.state.input.writingPreview) {
            this.state.input.writingPreview = true;

            this.state.input.previewModel = app.store.createRecord('chatmessages');
            this.state.input.previewModel.pushData({
                id: 0,
                attributes: { message: ' ', created_at: 0 },
                relationships: { user: app.session.user, chat: this.model },
            });
            Object.assign(this.state.input.previewModel, { isEditing: true, isNeedToFlash: true, content });
        } else this.state.input.previewModel.isNeedToFlash = true;

        m.redraw();
    }

    inputPreviewEnd() {
        this.state.input.writingPreview = false;

        m.redraw();
    }

    onChatMessageClicked(eventName, model) {
        switch (eventName) {
            case 'dropdownEditStart': {
                this.messageEdit(model, true);
                break;
            }
            case 'dropdownResend': {
                this.messageResend(model);
                break;
            }
            case 'insertMention': {
                this.insertMention(model);
                break;
            }
        }
    }

    messageSend(text) {
        if (text.trim().length > 0 && !this.state.loadingSend) {
            if (this.state.input.writingPreview) {
                this.state.input.writingPreview = false;

                this.messagePost(this.state.input.previewModel);
                ChatState.insertChatMessage(Object.assign(this.state.input.previewModel, {}));

                this.inputClear();
            } else if (this.state.messageEditing) {
                let model = this.state.messageEditing;
                if (model.content.trim() !== model.oldContent.trim()) {
                    model.oldContent = model.content;
                    ChatState.editChatMessage(model, true, model.content);
                }
                this.messageEditEnd();
                this.inputClear();
            }
        }
    }

    messageEdit(model) {
        let chatInput = this.getChatInput();
        if (this.state.input.writingPreview) this.inputPreviewEnd();

        model.isEditing = true;
        model.oldContent = model.message();

        this.state.messageEditing = model;
        chatInput.value = model.oldContent;
        chatInput.focus();
        this.inputProcess();

        m.redraw();
    }

    messageEditEnd() {
        let message = this.state.messageEditing;
        if (message) {
            message.isEditing = false;
            message.content = message.oldContent;
            this.inputClear();
            m.redraw();

            this.state.messageEditing = null;
        }
    }

    messageResend(model) {
        this.messagePost(model);
    }

    messagePost(model) {
        let self = this;
        self.state.loadingSend = true;
        m.redraw();

        return ChatState.postChatMessage(model).then(
            (r) => {
                self.state.loadingSend = false;

                m.redraw();
            },
            (r) => {
                self.state.loadingSend = false;

                m.redraw();
            }
        );
    }

    onChatChanged(model) {
        if (this.model) this.messagesDraw();
    }

    messagesDraw() {
        if (!this.state.messagesFetched) {
            let query;
            if (this.model.unreaded()) {
                query = this.model.readed_at()?.toISOString() ?? new Date(0).toISOString();
                this.state.scroll.autoScroll = false;
            }

            this.state.scroll.loading.all = true;
            ChatState.apiFetchChatMessages(this.model, query).then(() => {
                this.state.scroll.loading.all = false;

                if (this.model.unreaded()) {
                    let anchor = ChatState.getChatMessages((mdl) => mdl.chat() == this.model && mdl.created_at() > this.model.readed_at())[0];
                    this.scrollToAnchor(anchor);
                } else this.state.scroll.autoScroll = true;

                m.redraw();
            });

            this.state.messagesFetched = true;
            m.redraw();
        }
        this.inputSyncWithPreview();

        this.getChatWrapper().scrollTop = this.state.scroll.oldScroll;
    }

    timedRedraw(timeout, callback) {
        if (!this.redrawTimeout) {
            this.redrawTimeout = setTimeout(() => {
                m.redraw();
                if (callback) callback();
                this.redrawTimeout = null;
            }, timeout);
        }
    }

    insertMention(model) {
        let user = model.user();
        if (!app.session.user) return;

        var input = this.getChatInput();
        input.value += ` @${user.username()} `;
        input.focus();

        this.inputProcess();
    }
}
