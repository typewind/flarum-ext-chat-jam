import Component from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import ChatMessage from './ChatMessage';

import * as resources from '../resources';

var refAudio = new Audio();
refAudio.src = resources.base64AudioNotificationRef;
refAudio.volume = 0.5;

var audio = new Audio();
audio.src = resources.base64AudioNotification;
audio.volume = 0.5;

export default class ChatViewport extends Component
{
    config(isInitialized, context)
    {

    }

	init()
	{
        this.loading = false;
        this.scroll = {autoScroll: true, oldScroll: 0, loadingFetch: false, needToScroll: true};
		this.input = {messageLength: 0, rows: 1, preview: {}};
		this.messages = {components: [], instances: {}};

        this.permissions = {moderate: {}};
        if(!app.session.user) this.input.placeholder = app.translator.trans('pushedx-chat.forum.errors.unauthenticated');
        else
        {
            this.permissions.post = app.forum.attribute('pushedx-chat.permissions.chat');
            this.permissions.edit = app.forum.attribute('pushedx-chat.permissions.edit');
            this.permissions.delete = app.forum.attribute('pushedx-chat.permissions.delete');
            this.permissions.moderate.delete = app.forum.attribute('pushedx-chat.permissions.moderate.delete');
            this.permissions.moderate.vision = app.forum.attribute('pushedx-chat.permissions.moderate.vision');
            this.input.placeholder = app.translator.trans(this.permissions.post ? 'pushedx-chat.forum.chat.placeholder' : 'pushedx-chat.forum.errors.chatdenied')
        }

		let charLimit = app.forum.attribute('pushedx-chat.settings.charlimit');
        this.messageCharLimit = charLimit === null ? 512 : charLimit;
        
        this.isReached = {start: true, end: true};
        this.messagesFetched = false;

		this.chatFrame = this.props.chatFrame;
		this.chatPreview = this.props.chatPreview;
        this.model = this.props.model;
        
        if(this.model) app.pusher.then(this.listenSocketChannels.bind(this));
    }
    
    listenSocketChannels(socket)
    {
        socket.main.bind('neonchat.events', this.handleSocketEvent.bind(this));
        if(socket.user) socket.user.bind('neonchat.events', this.handleSocketEvent.bind(this));
    }

    handleSocketEvent(r)
    {
        if(r.event.chat_id == this.model.id())
        {
            console.log(r);
            
            let message = r.response.message, messageInstance;
            if(message) 
            {
                message = app.store.pushPayload(message);
                messageInstance = this.messages.instances[message.id()];
                m.redraw();
            }
            switch(r.event.id)
            {
                case 'message.post':
                {
                    if(!app.session.user || message.user().id() != app.session.user.id())
                    {
                        this.messageInsertToViewport(message, {}, true);
                        this.scroll.needToScroll = true;

                        m.redraw();
                    }
                    break;
                }
                case 'message.edit':
                {
                    let actions = message.data.attributes.actions;
                    if(actions.msg !== undefined)
                    {
                        if(!app.session.user || message.user().id() != app.session.user.id())
                        {
                            if(messageInstance)
                                messageInstance.edit(actions.msg);
                        }
                    }
                    else if(actions.hide !== undefined)
                    {
                        if(!app.session.user || actions.invoker != app.session.user.id())
                            actions.hide ? this.messageHide(message) : this.messageRestore(message);
                    }
                    break;
                }
                case 'message.delete':
                {
                    if(!app.session.user || message.user().id() != app.session.user.id())
                        this.messageDelete(message)

                    break;
                }
            }
        }
    }

	view()
	{
		if(!this.model) return <div><div className='wrapper' style={{height: this.chatFrame.transform.y + 'px'}}></div></div>

		return (
			<div>
				<div className='wrapper' 
					config={this.configScroll.bind(this)} 
					onscroll={this.disableAutoScroll.bind(this)}
					style={{height: this.chatFrame.transform.y + 'px'}}
				>
                    {!this.isReached.start ? <div style={{height: '600px'}}></div> : null}
					{this.scroll.loadingFetch ?
						<div className='message-wrapper'>
							<LoadingIndicator className='loading-old Button-icon' />
						</div>
						: null
					}
					{this.getStoragedMessages().concat(this.input.writingPreview ? this.input.preview.component : null)}
                    {!this.isReached.end ? <div style={{height: '600px'}}></div> : null}
				</div>
				<div className='input-wrapper'>
					<textarea
						type = 'text'
						id = 'chat-input'
						maxlength = {this.messageCharLimit}
						disabled = {!this.permissions.post}
						placeholder = {this.input.placeholder}
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
						style={{display: !this.permissions.post ? 'none' : ''}}
					>
						{(this.messageCharLimit - (this.input.messageLength || 0)) + '/' + this.messageCharLimit}
					</div>
				</div>
			</div>
		)
    }

    comporatorAscButZerosDesc(a, b)
    {
        return a == 0 ? 1 : (b == 0 ? -1 : a - b);
    }

	getStoragedMessages()
	{
        let store = this.chatFrame.messagesStorage;
		return store.sort((a, b) => this.comporatorAscButZerosDesc(a.instance.model.data.attributes.id, b.instance.model.data.attributes.id));
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

    configScroll(e)
    {
        if(this.scroll.oldScroll >= 0) e.scrollTop = this.scroll.oldScroll;
        else e.scrollTop = e.scrollHeight + this.scroll.oldScroll - 30;
    }

    disableAutoScroll(e)
    {
        let el = e.target;
        this.scroll.autoScroll = (el.scrollTop + el.offsetHeight >= el.scrollHeight);
        let currentHeight = el.scrollHeight;
        
        if(this.scroll.autoScroll) this.scroll.needToScroll = false;
        if(this.scroll.needToScroll) this.scrollToBottom();

        if(!this.isReached.start && el.scrollTop < 600)
        {
            console.log('lets fetch a new messages from start');
        }
        else if(!this.isReached.end && el.scrollTop > currentHeight - el.offsetHeight - 600)
        {
            console.log('lets fetch a new messages from end');
        }

        if(el.scrollTop <= 0 && this.scroll.oldScroll > 0 && !this.scroll.loadingFetch && !this.messageEditing) 
        {
            this.scroll.oldScroll = -currentHeight;
            m.redraw();

            //this.scroll.loadingFetch = true;
            //this.apiFetch(Object.values(this.messages.instances)[0].id);
        }
        else 
        {
            m.redraw.strategy('none');
            this.scroll.oldScroll = el.scrollTop;
        }
	}
	
    chatOnResize()
    {
        if(this.scroll.autoScroll) 
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
            input.value = this.input.preview.instance.message;
            this.inputProcess();
        }
	}
	
    inputProcess(e)
    {
        let input = this.getChatInput();
        let inputValue = input.value.trim();
        this.input.messageLength = inputValue.length;

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

        if(this.messageEditing) this.messageEditing.textFormat(inputValue);
        else if(this.input.writingPreview)
        {
            let preview = this.input.preview.instance;
            preview.textFormat(inputValue);
        }
        this.timedRedraw(100, () => this.scroll.autoScroll && !this.messageEditing ? this.scrollToBottom() : null);
    }

    inputPressEnter(e)
    {
        if(this.loading) return false;
        if(e.keyCode == 13 && !e.shiftKey)
        {
            this.messageSend(this.getChatInput().value);
            return false;
        }
        else m.redraw.strategy('none');
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

        if(!this.input.preview.component) 
        {
            let model = app.store.createRecord('chatmessages');
            model.pushData({attributes: {id: 0, message: ' ', created_at: 0}, relationships: {user: app.session.user, chat: this.model}});

            this.input.preview.component = this.createMessage(
                model, 
                {
                    is_editing: true,
                    needToFlash: true,
                }
            );
            this.input.preview.instance = this.messages.instances[0];
        }
        else this.input.preview.instance.needToFlash = true;
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

                let message = this.input.preview.instance;
                this.messagePost(message);

                message.is_editing = false;
    
                this.chatFrame.messagesStorage.push(this.input.preview.component);
                this.input.preview.component = null;
    
                this.inputClear();
            }
            else if(this.messageEditing)
            {
                let editingMsg = this.messageEditing;
                if(editingMsg.message.trim() !== editingMsg.oldContent.trim()) 
                {
                    editingMsg.controlEdit(editingMsg.message);
                    editingMsg.oldContent = editingMsg.message;
                }
                this.messageEditEnd();
                this.inputClear();
            }
        }
    }

    messageEdit(message)
    {
        let chatInput = this.getChatInput();
        this.inputPreviewEnd();
        
        message.is_editing = true;
        message.oldContent = message.model.message();

        this.messageEditing = message;
        chatInput.value = message.oldContent;
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
			message.textFormat(message.oldContent);
			m.redraw();
			this.messageEditing = null;
		}
    }

    messageHide(message)
    {
        let instance = this.messages.instances[message.id()];

        if(instance)
            instance.hide();
    }

    messageDelete(message)
    {
        let instance = this.messages.instances[message.id()];

        if(instance) 
            instance.delete();
    }

    messageRestore(message)
    {
        let instance = this.messages.instances[message.id()];

        if(instance) instance.restore();
        else 
        {
            this.messageInsertToViewport(message);
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

    isMessageInStorage(model)
    {
        return this.chatFrame.messagesStorage.find(e => e.instance.model.id() == model.id())
    }

    messageInsertToViewport(model, options = {}, notify = false)
    {
        if(this.isMessageInStorage(model)) return;
        let component = this.createMessage(model, options, notify);

        if(!this.chatFrame.viewportChat || model.chat().id() != this.chatFrame.viewportChat.model.id()) component.instance.viewportHidden = true;
        this.chatFrame.messagesStorage.push(component);
        let store = this.getStoragedMessages();
        if(store[store.length - 1] == component)
            this.chatPreview.model.pushData({relationships: {last_message: model}});
    }

	messagesUnload()
	{
        Object.values(this.messages.instances).map(c => c.viewportHidden = true);
        m.redraw();

		this.inputClear();
		this.messageEditEnd();
	}

	messagesLoad()
	{
        let messages = Object.values(this.messages.instances)
        if(messages.length) 
        {
            messages.map(c => c.viewportHidden = false);
            m.redraw();
            this.chatOnResize();
        }
        if(!this.messagesFetched) 
        {
            this.apiFetchChatMessages();
            this.messagesFetched = true;
        }
		this.inputSyncWithPreview();
	}

	apiFetchChatMessages()
	{
		let self = this;
		
		self.scroll.loadingFetch = true;
        m.redraw();
        
        app.store.find('chatmessages', {chat_id: this.model.id()})
            .then(r => {
                self.scroll.loadingFetch = false;
                self.scroll.autoScroll = false;

                let fetchedMessages = r.map((message) => self.createMessage(message)).filter(m => m);
                self.chatFrame.messagesStorage = self.chatFrame.messagesStorage.concat(fetchedMessages);

                //this.isReached.start = false;
                m.redraw();

                //this.getChatWrapper().scrollTop += 600;
            });
	}
	
	timedRedraw(timeout, callback)
	{
		m.redraw.strategy('none');
		
        if(!this.redrawTimeout)
        {
		    this.redrawTimeout = setTimeout(() => {
                m.redraw();
                callback();
                this.redrawTimeout = null;
            }, timeout);
        }
	}

    createMessage(model, options = {}, notify = false) 
    {  
        let found = this.isMessageInStorage(model)
        if(found) return null;

        let chatMessage = new ChatMessage(
            Object.assign(    
            {
                model: model,
                chatViewport: this,
                chatFrame: this.chatFrame,
                chatPreview: this.chatPreview,

            }, options)
        );

        this.messages.instances[chatMessage.model.data.attributes.id] = chatMessage;

        if(notify) this.messageNotify(chatMessage);
        if(this.scroll.needToScroll || this.scroll.autoScroll)
            this.scrollToBottom();

        let component = m.component(chatMessage);
        chatMessage.component = component;
        component.instance = chatMessage;
        return component;
    }

    insertMention(msgInstance)
    {
        let user = msgInstance.model.user();
        if(!app.session.user) return;

        var input = this.getChatInput();
        input.value = input.value + " @" + user.username() + " ";
		input.focus();
		
		this.inputProcess();

        m.redraw.strategy('none');
    }

    messageNotify(msgInstance)
    {
        if((!app.session.user || (msgInstance.model.user().id() != app.session.user.id()))) 
            this.notifyTry(msgInstance);

        msgInstance.flash();
    }
    
    notifyTry(msgInstance)
    {
        if(!("Notification" in window)) return;

        if(this.messageIsMention(msgInstance)) this.notifySend(msgInstance)
        this.notifySound(msgInstance);
    }

    messageIsMention(msgInstance)
    {
        return app.session.user && (msgInstance.model.message().indexOf('@' + app.session.user.username()) >= 0);
    }

    notifySend(msgInstance)
    {
        let avatar = msgInstance.model.user().avatarUrl();
        if(!avatar) avatar = resources.base64PlaceholderAvatarImage;

        if(this.chatFrame.notify && !this.chatFrame.active)
            new Notification(this.chatPreview.attrs.title, {body: `${msgInstance.model.user().username()}: ${msgInstance.model.message()}`, icon: avatar, silent: true});
    }

    notifySound(msgInstance) 
    {
        if(!this.isMuted) 
        {
            let sound = this.messageIsMention(msgInstance) ? refAudio : audio;
            sound.currentTime = 0;
            sound.play();
        }
    }
}