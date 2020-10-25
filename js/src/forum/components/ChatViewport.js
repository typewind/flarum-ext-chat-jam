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

        ChatState.evented.on('onChatChanged', this.onChatChanged.bind(this))
        ChatState.evented.on('onClickMessage', this.onChatMessageClicked.bind(this))
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
                    oncreate={this.wrapperOnCreate.bind(this)} 
                    onupdate={this.wrapperOnUpdate.bind(this)}
					onscroll={this.wrapperOnScroll.bind(this)}
					style={{height: ChatState.getFrameState('transform').y + 'px'}}
				>
					{this.state.scroll.loadingFetch ?
						<msgloader className='message-wrapper--loading'>
							<LoadingIndicator className='loading-old Button-icon' />
						</msgloader> : null
					}
					{ChatState.componentsChatMessages().concat(this.state.input.writingPreview ? ChatState.componentChatMessage(this.state.input.previewModel) : [])}
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

    wrapperOnCreate(vnode)
    {
        super.oncreate(vnode);
        this.wrapperOnUpdate(vnode);
    }

    wrapperOnUpdate(vnode)
    {
        let el = vnode.dom;
        if(this.model && this.state.scroll.autoScroll) 
            this.scrollToBottom();
    }

    wrapperOnScroll(e)
    {
        e.redraw = false;

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
        
        if(el.scrollTop <= 0) el.scrollTop = 1;
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
        if(this.state.input.content)
        {
            input.value = this.state.input.content;
            this.inputProcess();
        }
        else input.value = '';
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
                this.inputPreviewStart(inputValue);
        }
        else
        {
            if(this.state.input.writingPreview && !inputValue.length)
                this.inputPreviewEnd();
        }

        if(this.state.messageEditing) this.state.messageEditing.content = inputValue
        else if(this.state.input.writingPreview) this.state.input.previewModel.content = inputValue
        this.timedRedraw(100, () => this.state.scroll.autoScroll && !this.state.messageEditing ? this.scrollToBottom() : null);
    }

    inputPressEnter(e)
    {
        e.redraw = false;
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
        this.state.input.content = '';
    }

    inputPreviewStart(content)
    {
        if(!this.state.input.writingPreview) 
        {
            this.state.input.writingPreview = true;
            
            this.state.input.previewModel = app.store.createRecord('chatmessages');
            this.state.input.previewModel.pushData({id: 0, attributes: {message: ' ', created_at: 0}, relationships: {user: app.session.user, chat: this.model}});
            Object.assign(this.state.input.previewModel, {isEditing: true, isNeedToFlash: true, content})
        }
        else this.state.input.previewModel.isNeedToFlash = true;

        m.redraw();
    }

    inputPreviewEnd()
    {
        this.state.input.writingPreview = false;

        m.redraw();
    }

	onChatMessageClicked(eventName, model)
	{
		switch(eventName)
		{
			case 'dropdownEditStart':
			{
				this.messageEdit(model, true);
				break;
            }
            case 'dropdownResend':
            {
                this.messageResend(model);
                break;
            }
            case 'insertMention':
            {
                this.insertMention(model);
                break;
            }
        }
    }

    messageSend(text)
    {
        if(text.trim().length > 0 && !this.state.loadingSend)
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
                let model = this.state.messageEditing;
                if(model.content.trim() !== model.oldContent.trim()) 
                {
                    model.oldContent = model.content;
                    ChatState.editChatMessage(model, true, model.content);
                }
                this.messageEditEnd();
                this.inputClear();
            }
        }
    }

    messageEdit(model)
    {
        let chatInput = this.getChatInput();
        if(this.state.input.writingPreview) this.inputPreviewEnd();
        
        model.isEditing = true;
        model.oldContent = model.message();

        this.state.messageEditing = model;
        chatInput.value = model.oldContent;
        chatInput.focus();
        this.inputProcess();

        m.redraw();
    }

    messageEditEnd()
    {
        let message = this.state.messageEditing;
		if(message)
		{
            message.isEditing = false;
            message.content = message.oldContent;
			this.inputClear();
			m.redraw();

            this.state.messageEditing = null;
		}
    }

    messageResend(model)
    {
        this.messagePost(model);
    }
    
    messagePost(model)
    {
        let self = this;
        self.state.loadingSend = true;
        m.redraw();

        return ChatState.postChatMessage(model)
        .then(
            r => {
                self.state.loadingSend = false;

                m.redraw();
            },
            r => {
                self.state.loadingSend = false;

                m.redraw();
            }
        );
    }

    onChatChanged(model)
    {
        if(this.model) this.messagesLoad()
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

    insertMention(model)
    {
        let user = model.user();
        if(!app.session.user) return;

        var input = this.getChatInput();
        input.value += ` @${user.username() } `;
		input.focus();
		
		this.inputProcess();
    }
}