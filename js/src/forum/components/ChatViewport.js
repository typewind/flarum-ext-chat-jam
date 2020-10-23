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
        if(this.model) this.state = ChatState.getViewportState(this.model);
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
					{this.state.scroll.loadingFetch ?
						<div className='message-wrapper'>
							<LoadingIndicator className='loading-old Button-icon' />
						</div> : null
					}
					{ChatState.componentsChatMessages()}
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

						rows = {this.state.input.rows}
					/>
					{this.state.messageEditing ?
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
						{(this.messageCharLimit - (this.state.input.messageLength || 0)) + '/' + this.messageCharLimit}
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
        this.oldReached = (this.messageCharLimit - (this.state.input.messageLength || 0)) < 100;
        return this.oldReached;
    }

    configScroll(vnode)
    {
        super.oncreate(vnode);
        let e = vnode.dom;

        if(this.state.scroll.oldScroll >= 0) e.scrollTop = this.state.scroll.oldScroll;
        else e.scrollTop = e.scrollHeight + this.state.scroll.oldScroll - 30;

        this.chatOnResize(vnode);
    }

    disableAutoScroll(e)
    {
        e.redraw = false;
        if(ChatState.getCurrentChat() != this.model) return

        let el = e.target;
        this.state.scroll.autoScroll = (el.scrollTop + el.offsetHeight >= el.scrollHeight);
        let currentHeight = el.scrollHeight;
        
        if(this.state.scroll.autoScroll) this.state.scroll.needToScroll = false;
        if(this.state.scroll.needToScroll) this.scrollToBottom();

        if(el.scrollTop <= 0 && this.state.scroll.oldScroll > 0 && !this.state.scroll.loadingFetch && !this.state.messageEditing) 
        {
            this.state.scroll.oldScroll = -currentHeight;
            let topMessage = ChatState.getChatMessages(model => model.chat() == this.model)[0];
            if(topMessage) ChatState.apiFetchChatMessages(this.model, topMessage.id());
        }
        else this.state.scroll.oldScroll = el.scrollTop;
	}
	
    chatOnResize(vnode)
    {
        if(this.model && this.state.scroll.autoScroll) 
            this.scrollToBottom();
    }

    scrollToBottom()
    {
        let chatFrame = this.getChatFrame();
        if(chatFrame)
        {
            if(this.state.scroll.timeout) clearTimeout(this.state.scroll.timeout);
            this.state.scroll.timeout = setTimeout(() => chatFrame.scroll({top: chatFrame.scrollHeight, behavior: 'smooth'}), 100);
            if(!this.state.scroll.autoScroll) this.state.scroll.needToScroll = true;
        }
	}

	inputClear()
	{
		input.value = '';
	}

	inputSyncWithPreview()
	{
		let input = this.getChatInput();
        if(this.state.input.writingPreview)
        {
            input.value = this.state.input.content;
            this.state.inputProcess();
        }
	}
	
    inputProcess(e)
    {
        if(e) e.redraw = false;

        let input = this.getChatInput();
        let inputValue = input.value.trim();
        this.state.input.messageLength = inputValue.length;
        this.state.input.content = inputValue;

        if(!input.baseScrollHeight)
        {
            input.baseScrollHeight = input.scrollHeight;
            input.lineHeight = parseInt(window.getComputedStyle(input).getPropertyValue('line-height'));
        }

        input.rows = 1;
        let rows = Math.ceil((input.scrollHeight - input.baseScrollHeight) / input.lineHeight) + 1;
        this.state.input.rows = rows;
        input.rows = rows;

        if(this.state.input.messageLength)
        {
            if(!this.state.input.writingPreview && !this.state.messageEditing)
                this.state.inputPreviewStart();
        }
        else
        {
            if(this.state.input.writingPreview && !inputValue.length)
                this.state.inputPreviewEnd();
        }

        if(this.state.messageEditing) ChatState.renderChatMessage(this.state.messageEditing, inputValue)
        else if(this.state.input.writingPreview) ChatState.renderChatMessage(this.state.input.previewModel, inputValue)
        this.timedRedraw(100, () => this.state.scroll.autoScroll && !this.state.messageEditing ? this.scrollToBottom() : null);
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
        this.state.input.messageLength = 0;
        this.state.input.rows = 1;
        this.getChatInput().value = '';
    }

    inputPreviewStart()
    {
        this.state.input.writingPreview = true;

        if(!this.state.input.previewModel) 
        {
            this.state.input.previewModel = app.store.createRecord('chatmessages');
            this.state.input.previewModel.pushData({id: 0, attributes: {message: ' ', created_at: 0}, relationships: {user: app.session.user, chat: this.model}});
        }
        m.redraw();
    }

    inputPreviewEnd()
    {
        this.state.input.writingPreview = false;

        m.redraw();
    }

    messageSend(text)
    {
        if(text.trim().length > 0 && !this.loading)
        {
            if(this.state.input.writingPreview) 
            {
                this.state.input.writingPreview = false;
                
                this.messagePost(this.state.input.previewModel);
                ChatState.insertChatMessage(Object.assign(this.state.input.previewModel, {}));
    
                this.inputClear();
            }
            else if(this.state.messageEditing)
            {
                let editingMsg = this.state.messageEditing;
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
        if(this.state.input.writingPreview) this.state.inputPreviewEnd();
        
        model.is_editing = true;
        model.oldContent = model.message();

        this.state.messageEditing = model;
        chatInput.value = model.oldContent;
        chatInput.focus();
        this.state.inputProcess();

        m.redraw();
    }

    messageEditEnd()
    {
        let message = this.state.messageEditing;

		if(message)
		{
			message.is_editing = false;
			this.inputClear();
			m.redraw();
            ChatState.renderChatMessage(message, message.oldContent);

            this.state.messageEditing = null;
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
        self.state.loading = true;
        m.redraw();

        return instance.model.save({message: instance.message, created_at: new Date(), chat_id: this.model.id()})
        .then(
            r => {
                instance.timedOut = false;
                self.chatPreview.model.pushData({relationships: {last_message: instance.model}});

                self.input.preview.instance = null;
                self.state.loading = false;
                instance.flash();

                m.redraw();
            },
            r => {
                instance.timedOut = true;

                self.state.input.preview.instance = null;
                self.state.loading = false;

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
        if(!this.state.messagesFetched) 
        {
            ChatState.apiFetchChatMessages(this.model);
            this.state.messagesFetched = true;
        }
        this.inputSyncWithPreview();

        this.getChatWrapper().scrollTop = this.state.scroll.oldScroll;
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
		
		this.state.inputProcess();
    }
}