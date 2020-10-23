import Component from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import ChatMessage from './ChatMessage';

import ChatState from '../states/ChatState';

export default class ChatViewport extends Component
{
	oninit(vnode)
	{
        super.oninit(vnode);

        this.model = this.attrs.model;

        this.messageCharLimit = app.forum.attribute('pushedx-chat.settings.charlimit') ?? 512;
        if(!app.session.user) this.inputPlaceholder = app.translator.trans('pushedx-chat.forum.errors.unauthenticated')
        else this.inputPlaceholder = app.translator.trans(ChatState.getPermissions().post ? 'pushedx-chat.forum.chat.placeholder' : 'pushedx-chat.forum.errors.chatdenied')

        ChatState.evented.on('onClickMessage', (eventName, model) => {
            console.log('chatViewport:', eventName, model);
        })
        ChatState.evented.on('onChatChanged', this.onChatChanged.bind(this))
    }

    onbeforeupdate(vnode)
    {
        super.onbeforeupdate(vnode);
        
        this.model = this.attrs.model;
        if(this.model) Object.assign(this, ChatState.getViewportState(this.model))
    }
  
	view(vnode)
	{
        if(!this.model) 
        {
            return (
                <div>
                    <div className='wrapper' style={{height: ChatState.getFrameState('transform').y + 'px'}}>

                    </div>
                </div>
            );
        }

		return (
			<div>
				<div className='wrapper' 
                    oncreate={this.configScroll.bind(this)} 
                    onupdate={this.chatOnResize(this)}
					onscroll={this.disableAutoScroll.bind(this)}
					style={{height: ChatState.getFrameState('transform').y + 'px'}}
				>
					{this.scroll.loadingFetch ?
						<div className='message-wrapper'>
							<LoadingIndicator className='loading-old Button-icon' />
						</div> : null
					}
					{ChatState.componentsChatMessages().concat(this.input.previewModel ? ChatState.componentChatMessage(this.input.previewModel) : null)}
				</div>
				<div className='input-wrapper'>
					<textarea
						id = 'chat-input'
						maxlength = {this.messageCharLimit}
						disabled = {!ChatState.getPermissions().post}
						placeholder = {this.inputPlaceholder}
						onkeypress = {this.inputPressEnter.bind(this)}
						oninput = {this.inputProcess.bind(this)}
						onpaste = {this.inputProcess.bind(this)}

						rows = {this.input.rows}
					/>
					{this.messageEditing ?
						<div className='icon edit' onclick={this.messageEditEnd.bind(this)}>
							<i class="fas fa-times"></i>
						</div>    
						: null
					}
					<div className='icon send' onclick={this.inputPressButton.bind(this)}>
						<i class="fas fa-angle-double-right"></i>
					</div>
					<div id='chat-limitter' 
						className={this.reachedLimit() ? 'reaching-limit' : ''}
						style={{display: !ChatState.getPermissions().post ? 'none' : ''}}
					>
						{(this.messageCharLimit - (this.input.messageLength || 0)) + '/' + this.messageCharLimit}
					</div>
				</div>
			</div>
		)
    }

    getChat()
    {
        return document.querySelector('.neonchat');
    }

    getChatHeader()
    {
        return document.querySelector('.neonchat #chat-header');
    }
    
    getChatFrame()
    {
        return document.querySelector('.neonchat .wrapper');
    }

    getChatInput()
    {
        return document.querySelector('.neonchat #chat-input');
    }

    getChatsList()
    {
        return document.querySelector('.neonchat #chats-list');
    }
    
    getChatWrapper()
    {
        return document.querySelector('.neonchat .wrapper');
    }

    reachedLimit()
    {
        this.oldReached = (this.messageCharLimit - (this.input.messageLength || 0)) < 100;
        return this.oldReached;
    }

    configScroll(vnode)
    {
        super.oncreate(vnode);
        let e = vnode.dom;

        if(this.scroll.oldScroll >= 0) e.scrollTop = this.scroll.oldScroll;
        else e.scrollTop = e.scrollHeight + this.scroll.oldScroll - 30;

        this.chatOnResize(vnode);
    }

    disableAutoScroll(e)
    {
        e.redraw = false;
        if(ChatState.getCurrentChat() != this.model) return

        let el = e.target;
        this.scroll.autoScroll = (el.scrollTop + el.offsetHeight >= el.scrollHeight);
        let currentHeight = el.scrollHeight;
        
        if(this.scroll.autoScroll) this.scroll.needToScroll = false;
        if(this.scroll.needToScroll) this.scrollToBottom();

        if(el.scrollTop <= 0 && this.scroll.oldScroll > 0 && !this.scroll.loadingFetch && !this.messageEditing) 
        {
            this.scroll.oldScroll = -currentHeight;
            let topMessage = ChatState.getChatMessages(model => model.chat() == this.model)[0];
            if(topMessage) this.apiFetchChatMessages(topMessage.id());
        }
        else this.scroll.oldScroll = el.scrollTop;
	}
	
    chatOnResize(vnode)
    {
        if(this.model && this.scroll.autoScroll) 
            this.scrollToBottom();
    }

    scrollToBottom()
    {
        let chatFrame = this.getChatFrame();
        if(chatFrame)
        {
            if(this.scroll.timeout) clearTimeout(this.scroll.timeout);
            this.scroll.timeout = setTimeout(() => chatFrame.scroll({top: chatFrame.scrollHeight, behavior: 'smooth'}), 100);
            if(!this.scroll.autoScroll) this.scroll.needToScroll = true;
        }
	}

	inputClear()
	{
		input.value = '';
	}

	inputSyncWithPreview()
	{
		let input = this.getChatInput();
        if(this.input.writingPreview)
        {
            input.value = this.input.content;
            this.inputProcess();
        }
	}
	
    inputProcess(e)
    {
        if(e) e.redraw = false;

        let input = this.getChatInput();
        let inputValue = input.value.trim();
        this.input.messageLength = inputValue.length;
        this.input.content = inputValue;

        if(!input.baseScrollHeight)
        {
            input.baseScrollHeight = input.scrollHeight;
            input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
        }

        input.rows = 1;
        let rows = Math.ceil((input.scrollHeight - input.baseScrollHeight) / input.lineHeight) + 1;
        this.input.rows = rows;
        input.rows = rows;

        if(this.input.messageLength)
        {
            if(!this.input.writingPreview && !this.messageEditing)
                this.inputPreviewStart();
        }
        else
        {
            if(this.input.writingPreview && !inputValue.length)
                this.inputPreviewEnd();
        }

        if(this.messageEditing) ChatState.renderChatMessage(this.messageEditing, inputValue)
        else if(this.input.writingPreview) ChatState.renderChatMessage(this.input.previewModel, inputValue)
        this.timedRedraw(100, () => this.scroll.autoScroll && !this.messageEditing ? this.scrollToBottom() : null);
    }

    inputPressEnter(e)
    {
        e.redraw = false;
        if(this.loading) return false;
        if(e.keyCode == 13 && !e.shiftKey)
        {
            this.messageSend(this.getChatInput().value);
            return false;
        }
        return true;
    }

    inputPressButton() 
    {
        this.messageSend(this.getChatInput().value);
    }

    inputClear()
    {
        this.input.messageLength = 0;
        this.input.rows = 1;
        this.getChatInput().value = '';
    }

    inputPreviewStart()
    {
        this.input.writingPreview = true;

        if(!this.input.previewModel) 
        {
            this.input.previewModel = app.store.createRecord('chatmessages');
            this.input.previewModel.pushData({id: 0, attributes: {message: ' ', created_at: 0}, relationships: {user: app.session.user, chat: this.model}});
        }
        m.redraw();
    }

    inputPreviewEnd()
    {
        this.input.writingPreview = false;

        m.redraw();
    }

    messageSend(text)
    {
        if(text.trim().length > 0 && !this.loading)
        {
            if(this.input.writingPreview) 
            {
                this.input.writingPreview = false;
                
                this.messagePost(this.input.previewModel);
                ChatState.insertChatMessage(Object.assign(this.input.previewModel, {}));
    
                this.inputClear();
            }
            else if(this.messageEditing)
            {
                let editingMsg = this.messageEditing;
                if(editingMsg.message().trim() !== editingMsg.oldContent.trim()) 
                {
                    editingMsg.controlEdit(editingMsg.message());
                    editingMsg.oldContent = editingMsg.message();
                }
                this.messageEditEnd();
                this.inputClear();
            }
        }
    }

    messageEdit(model)
    {
        let chatInput = this.getChatInput();
        if(this.input.writingPreview) this.inputPreviewEnd();
        
        model.is_editing = true;
        model.oldContent = model.message();

        this.messageEditing = model;
        chatInput.value = model.oldContent;
        chatInput.focus();
        this.inputProcess();

        m.redraw();
    }

    messageEditEnd()
    {
        let message = this.messageEditing;

		if(message)
		{
			message.is_editing = false;
			this.inputClear();
			m.redraw();
            ChatState.renderChatMessage(message, message.oldContent);

            this.messageEditing = null;
		}
    }

    messageHide(message)
    {
        ChatState.evented.trigger('messageHide', message)
    }

    messageDelete(message)
    {
        ChatState.evented.trigger('messageDelete', message)
    }

    messageRestore(message)
    {
        if(ChatState.isChatMessageExists(message)) ChatState.evented.trigger('messageRestore', message)
        else 
        {
            ChatState.insertChatMessage(message);
            m.redraw();
        }
    }

    messageResend(instance)
    {
        this.messagePost(instance);
    }
    
    messagePost(instance)
    {
        let self = this;
        self.loading = true;
        m.redraw();

        return instance.model.save({message: instance.message, created_at: new Date(), chat_id: this.model.id()})
        .then(
            r => {
                instance.timedOut = false;
                self.chatPreview.model.pushData({relationships: {last_message: instance.model}});

                self.input.preview.instance = null;
                self.loading = false;
                instance.flash();

                m.redraw();
            },
            r => {
                instance.timedOut = true;

                self.input.preview.instance = null;
                self.loading = false;

                m.redraw();
            }
        );
    }

    onChatChanged(model)
    {
        if(this.model) this.messagesLoad()
    }

	messagesUnload()
	{
		this.inputClear();
        this.messageEditEnd();
        
        m.redraw();
	}

	messagesLoad()
	{
        if(!this.messagesFetched) 
        {
            this.apiFetchChatMessages();
            this.messagesFetched = true;
        }
        this.inputSyncWithPreview();

        this.getChatWrapper().scrollTop = this.scroll.oldScroll;
	}

	apiFetchChatMessages(start_from)
	{
		let self = this;
		
        self.scroll.loadingFetch = true;
        m.redraw();
        
        app.store.find('chatmessages', {chat_id: self.model.id(), start_from})
            .then(r => {
                self.scroll.loadingFetch = false;
                self.scroll.autoScroll = false;

                r.map((model) => ChatState.insertChatMessage(model));
                m.redraw();
            });
	}
	
	timedRedraw(timeout, callback)
	{
        if(!this.redrawTimeout)
        {
		    this.redrawTimeout = setTimeout(() => {
                m.redraw();
                callback();
                this.redrawTimeout = null;
            }, timeout);
        }
	}

    insertMention(msgInstance)
    {
        let user = msgInstance.model.user();
        if(!app.session.user) return;

        var input = this.getChatInput();
        input.value = input.value + " @" + user.username() + " ";
		input.focus();
		
		this.inputProcess();
    }
}