import Component from 'flarum/Component';
import ChatWelcome from './ChatWelcome';

import ChatCreateModal from './ChatCreateModal';
import ChatEditModal from './ChatEditModal';

import ChatState from '../states/ChatState';

export default class ChatFrame extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        if ('Notification' in window && ChatState.getFrameState('notify')) Notification.requestPermission();
        setInterval(() => m.redraw(), 30000);

        document.addEventListener('mousedown', this.chatMoveListener.bind(this, 'mousedown'));
        document.addEventListener('mouseup', this.chatMoveListener.bind(this, 'mouseup'));

        if (!app.pusher) {
            alert('Please enable Pusher/WebSocket to use Neon Chat!');
            return;
        }

        ChatState.apiFetchChats();
    }

    getChat() {
        return document.querySelector('.neonchat');
    }

    getChatFrame() {
        return document.querySelector('.neonchat #chat');
    }

    getChatHeader() {
        return document.querySelector('.neonchat #chat-header');
    }

    getChatWrapper() {
        return document.querySelector('.neonchat .wrapper');
    }

    getChatViewport() {
        return document.querySelector('.neonchat #chat-viewport');
    }

    getChatsListPanel() {
        return document.querySelector('.neonchat #chats-list');
    }

    getChatsList() {
        return document.querySelector('.neonchat #chats-list .list');
    }

    toggleChat(e) {
        var chat = this.getChat();
        var classes = chat.className;
        var showing = false;

        if (chat.classList.contains('hidden')) {
            chat.classList.remove('hidden');
            showing = true;
        } else chat.classList.add('hidden');

        chat.className = classes;

        ChatState.saveFrameState('beingShown', showing);
    }

    toggleChatsList(e) {
        var chatLists = this.getChatsListPanel();
        var showing = true;

        if (chatLists.classList.contains('toggled')) {
            chatLists.classList.remove('toggled');
            showing = false;
        } else chatLists.classList.add('toggled');

        ChatState.saveFrameState('beingShownChatsList', showing);
    }

    toggleSound(e) {
        ChatState.saveFrameState('isMuted', !ChatState.getFrameState('isMuted'));

        e.preventDefault();
        e.stopPropagation();
    }

    toggleNotifications(e) {
        ChatState.saveFrameState('notify', !ChatState.getFrameState('notify'));
        if ('Notification' in window && ChatState.getFrameState('notify')) Notification.requestPermission();

        e.preventDefault();
        e.stopPropagation();
    }

    view(vnode) {
        return (
            <div
                className={'neonchat left container ' + (ChatState.getFrameState('beingShown') ? '' : 'hidden')}
                style={{ right: ChatState.getFrameState('transform').x + 'px' }}
            >
                <div tabindex="0" className="frame" id="chat">
                    <div id="chats-list" className={ChatState.getFrameState('beingShownChatsList') ? 'toggled' : ''}>
                        <div className="header">
                            <div className="input-wrapper input--down">
                                <textarea id="chat-find" placeholder={app.translator.trans('xelson-chat.forum.chat.list.placeholder')} />
                            </div>
                            <div
                                className="icon icon-toggle"
                                onclick={this.toggleChatsList.bind(this)}
                                data-title={app.translator.trans(
                                    'xelson-chat.forum.chat.list.' + (ChatState.getFrameState('beingShownChatsList') ? 'unpin' : 'pin')
                                )}
                            >
                                <i className="fas fa-paperclip"></i>
                            </div>
                        </div>
                        <div className="list" style={{ 'max-height': ChatState.getFrameState('transform').y + 'px' }}>
                            {ChatState.componentsChats()}
                            {app.session.user && ChatState.getPermissions().create.chat ? (
                                <div class="panel-add" onclick={() => app.modal.show(ChatCreateModal)}></div>
                            ) : null}
                        </div>
                    </div>

                    <div id="chat-panel">
                        <div id="chat-header" ondragstart={() => false} onmousedown={this.chatHeaderOnMouseDown.bind(this)}>
                            <h2>
                                {ChatState.getCurrentChat()
                                    ? [
                                          ChatState.getCurrentChat().icon() ? (
                                              <i
                                                  class={ChatState.getCurrentChat().icon()}
                                                  style={{ color: ChatState.getCurrentChat().color(), 'margin-right': '3px' }}
                                              ></i>
                                          ) : null,
                                          ChatState.getCurrentChat().title(),
                                      ]
                                    : app.translator.trans('xelson-chat.forum.toolbar.title')}
                            </h2>
                            {!ChatState.getCurrentChat() || !app.session.user ? null : (
                                <div
                                    className="icon"
                                    data-title={app.translator.trans('xelson-chat.forum.toolbar.chat.settings')}
                                    onclick={() => app.modal.show(ChatEditModal, { model: ChatState.getCurrentChat() })}
                                >
                                    <i className="fas fa-cog"></i>
                                </div>
                            )}
                            <div className="window-buttons">
                                <div
                                    className="icon"
                                    onclick={this.toggleSound.bind(this)}
                                    data-title={app.translator.trans(
                                        'xelson-chat.forum.toolbar.' + (ChatState.getFrameState('isMuted') ? 'enable_sounds' : 'disable_sounds')
                                    )}
                                >
                                    <i className={ChatState.getFrameState('isMuted') ? 'fas fa-volume-mute' : 'fas fa-volume-up'}></i>
                                </div>
                                <div
                                    className="icon"
                                    onclick={this.toggleNotifications.bind(this)}
                                    data-title={app.translator.trans(
                                        'xelson-chat.forum.toolbar.' +
                                            (ChatState.getFrameState('notify') ? 'disable_notifications' : 'enable_notifications')
                                    )}
                                >
                                    <i className={ChatState.getFrameState('notify') ? 'fas fa-bell' : 'fas fa-bell-slash'}></i>
                                </div>
                                <div
                                    className="icon"
                                    onclick={this.toggleChat.bind(this)}
                                    data-title={app.translator.trans(
                                        'xelson-chat.forum.toolbar.' + (ChatState.getFrameState('beingShown') ? 'minimize' : 'maximize')
                                    )}
                                >
                                    <i className={ChatState.getFrameState('beingShown') ? 'fas fa-window-minimize' : 'fas fa-window-maximize'}></i>
                                </div>
                            </div>
                        </div>
                        <div id="chat-viewport">{ChatState.componentCurViewport() ?? <ChatWelcome />}</div>
                    </div>
                </div>
            </div>
        );
    }

    tooltip(vnode) {
        $(vnode.dom).tooltip('fixTitle');
    }

    chatHeaderOnMouseDown(e) {
        var path = e.path || (e.composedPath && e.composedPath());
        if (path) {
            for (let i = 0, el; i < path.length; i++) {
                el = path[i];
                if (el.classList && el.classList.contains('icon')) return;
            }
        }

        if (!this.chatMoveStart(e)) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    chatMoveListener(event, e) {
        switch (event) {
            case 'mouseup': {
                if (this.chatMoving) this.chatMoveEnd(e);
                break;
            }
        }
    }

    chatMoveStart(e) {
        this.chatMoving = true;
        this.mouseMoveEvent = this.chatMoveProcess.bind(this);
        this.moveLast = { x: e.clientX, y: e.clientY };

        document.addEventListener('mousemove', this.mouseMoveEvent);
        document.body.classList.add('moving');

        return false;
    }

    chatMoveEnd(e) {
        this.chatMoving = false;
        document.removeEventListener('mousemove', this.mouseMoveEvent);
        document.body.classList.remove('moving');

        ChatState.saveFrameState('transform', { x: parseInt(this.getChat().style.right), y: this.getChatWrapper().offsetHeight });
    }

    chatMoveProcess(e) {
        let chat = this.getChat();
        let chatWrapper = this.getChatWrapper();

        let move = { x: e.clientX - this.moveLast.x, y: e.clientY - this.moveLast.y };
        let right = parseInt(chat.style.right) || 0;
        let wrapperHeight = chatWrapper.offsetHeight;
        let nextPos = { x: right - move.x, y: wrapperHeight - move.y };

        if ((nextPos.x < window.innerWidth - this.getChatFrame().offsetWidth && move.x < 0) || (nextPos.x > 0 && move.x > 0))
            chat.style.right = nextPos.x + 'px';

        if (0 < nextPos.y && nextPos.y < window.innerHeight - 100) {
            chatWrapper.style.height = nextPos.y + 'px';
            this.getChatsList().style.maxHeight = this.getChatViewport().scrollHeight + 'px';
            chatWrapper.scrollTop += move.y;
        }

        this.moveLast = { x: e.clientX, y: e.clientY };
    }
}
