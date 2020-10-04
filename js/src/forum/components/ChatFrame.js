import Component from 'flarum/Component';
import ChatPreview from './ChatPreview';
import ChatViewport from './ChatViewport';

import createStore from '../store';

export default class ChatFrame extends Component
{
    init()
    {
        let beingShown = localStorage.getItem('chat_beingShown');
        let beingShownChatsList = localStorage.getItem('chat_beingShownChatsList');
        let isMuted = localStorage.getItem('chat_isMuted');
        let notify = localStorage.getItem('chat_notify');
        let transform = localStorage.getItem('chat_transform');

        createStore(this);

        this.beingShown = beingShown === null ? !app.forum.attribute('pushedx-chat.settings.display.minimize') : JSON.parse(beingShown);
        this.beingShownChatsList = beingShownChatsList === null ? 0 : JSON.parse(beingShownChatsList);
        this.isMuted = isMuted === null ? false : JSON.parse(isMuted);
        this.notify = notify === null ? false : JSON.parse(notify);
        this.transform = transform === null ? {x: 0, y: 400} : JSON.parse(transform);
        this.chats = {components: [], instances: {}};
        this.messagesStorage = [];

        if(this.notify) Notification.requestPermission();

		setInterval(() => m.redraw(), 30000);

        document.addEventListener('mousedown', this.chatMoveListener.bind(this, 'mousedown'));
        document.addEventListener('mouseup', this.chatMoveListener.bind(this, 'mouseup'));
        window.addEventListener('blur', (() => this.active = false));
        window.addEventListener('focus', (() => this.active = true));

        if(!app.forum.attribute('pushedx-chat.settings.censor') || app.session.user)
        {
            if(app.pusher)
            {
                app.pusher.then(pusher => 
                {
                    this.pusher = pusher
                    this.pusherAttach(this.pusher)
                });
            }
            else alert("Please enable Pusher/WebSocket to use Neon Chat!");
        }

        this.apiFetchChats();
    }

    pusherAttach(pusher)
    {
        function event(name, callback) {
            return {name: name, callback: callback};
        };

        this.pusherEvents = 
        [
            event('pushedx-chat.socket.event.post', data =>
            {
                if(!app.session.user || data.user_id != app.session.user.id())
                {
                    this.messages.components.push(this.createMessage(data, {}, true));
                    this.scroll.needToScroll = true;
                    m.redraw();
                }
            }),
            event('pushedx-chat.socket.event.edit', data =>
            {
                if(data.attributes.msg !== undefined)
                {
                    if(!app.session.user || data.user_id != app.session.user.id())
                    {
                        if(this.messages.instances[data.id])
                            this.messages.instances[data.id].edit(data.attributes.msg, true);
                    }
                }
                else if(data.attributes.hide !== undefined)
                {
                    if(!app.session.user || data.invoker != app.session.user.id())
                        data.attributes.hide ? this.messageDelete(data) : this.messageRestore(data)
                }
            }),
            event('pushedx-chat.socket.event.delete', data =>
            {
                if(!app.session.user || data.user_id != app.session.user.id())
                    this.messageDelete(data)
            })  
        ]
        this.pusherEvents.map(event => pusher.main.bind(event.name, event.callback));
    }

    pusherDetach(pusher)
    {
        this.pusherEvents.map(event => pusher.main.unbind(event.name));
    }

    getChat()
    {
        return document.querySelector('.chat');
    }

    getChatHeader()
    {
        return document.querySelector('.chat #chat-header');
    }
    
    getChatWrapper()
    {
        return document.querySelector('.chat .wrapper');
    }

    getChatInput()
    {
        return document.querySelector('.chat #chat-input');
    }

    getChatsList()
    {
        return document.querySelector('.chat #chats-list');
    }

    toggleChat(e)
    {
        var chat = this.getChat();
        var classes = chat.className;
        var showing = false;

        if(chat.classList.contains('hidden'))
        {
            chat.classList.remove('hidden')
            showing = true;
        }
        else chat.classList.add('hidden')

        chat.className = classes;
        this.beingShown = showing;
        localStorage.setItem('chat_beingShown', JSON.stringify(showing));
    }

    toggleChatsList(e)
    {
        var chatLists = this.getChatsList();
        var showing = true;

        if(chatLists.classList.contains('toggled'))
        {
            chatLists.classList.remove('toggled')
            showing = false;
        }
        else chatLists.classList.add('toggled')

        this.beingShownChatsList = showing;
        localStorage.setItem('chat_beingShownChatsList', JSON.stringify(showing));
    }

    toggleSound(e)
    {
        this.isMuted = !this.isMuted;
        localStorage.setItem('chat_isMuted', JSON.stringify(this.isMuted));

        e.preventDefault();
        e.stopPropagation();
    }

    toggleNotifications(e)
    {
        this.notify = !this.notify;
        localStorage.setItem('chat_notify', JSON.stringify(this.notify));

        if(this.notify) Notification.requestPermission();

        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Show the actual Chat Frame.
     *
     * @returns {*}
     */
    view() 
    {
        return (
            <div className={'chat left container ' + (this.beingShown ? '' : 'hidden')} style={{right: this.transform.x + 'px'}}>
                <div tabindex='0' className='frame' id='chat'>
                    <div id='chats-list' className={(this.beingShownChatsList ? 'toggled' : '')}>
                        <div className='header'>
                            <div className='input-wrapper'>
                                <textarea
                                    type = 'text'
                                    id = 'chat-find'
                                    placeholder = {app.translator.trans('pushedx-chat.forum.chat.list.placeholder')}
                                />
                            </div>
                            <p data-title={app.translator.trans('pushedx-chat.forum.chat.list.' + (this.beingShownChatsList ? 'unpin' : 'pin'))}>
                                <div className='icon icon-toggle' onclick={this.toggleChatsList.bind(this)}>
                                    <i className="fas fa-paperclip"></i>
                                </div>
                            </p>
                        </div>
                        {this.chats.components}
                        <div class="panel-add">
                            <div>
                                <span>+</span>
                            </div>
                        </div>
                    </div>

                    <div id='chat-panel'>
                        <div id='chat-header' ondragstart={() => false}>
                            <h2>{app.translator.trans('pushedx-chat.forum.toolbar.title')}</h2>
                            <p data-title={app.translator.trans(this.beingShown ? 'pushedx-chat.forum.toolbar.minimize' : 'pushedx-chat.forum.toolbar.maximize')}>
                                <div className='icon' onclick={this.toggleChat.bind(this)}>
                                    <i className={this.beingShown ? 'fas fa-window-minimize' : 'fas fa-window-maximize'}></i>
                                </div>
                            </p>   
                            <p data-title={app.translator.trans(this.notify ? 'pushedx-chat.forum.toolbar.disable_notifications' : 'pushedx-chat.forum.toolbar.enable_notifications')}>
                                <div className='icon' onclick={this.toggleNotifications.bind(this)}>
                                    <i className={this.notify ? 'fas fa-bell' : 'fas fa-bell-slash'}></i>
                                </div>
                            </p>   
                            <p data-title={app.translator.trans(this.isMuted ? 'pushedx-chat.forum.toolbar.enable_sounds' : 'pushedx-chat.forum.toolbar.disable_sounds')}>
                                <div className='icon' onclick={this.toggleSound.bind(this)}>
                                    <i className={this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'}></i>
                                </div>
                            </p>
                        </div>
                        <div id='chat-viewport'>
                            {this.viewportChat ? this.viewportChat.viewport.component : <ChatViewport chatFrame={this}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    chatMoveListener(event, e)
    {
        switch(event)
        {
            case 'mousedown':
            {
                if(e.target == this.getChatHeader())
                {
                    if(!this.chatMoveStart(e))
                    {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }
                break;
            }
            case 'mouseup': 
            {
                if(this.chatMoving) this.chatMoveEnd(e);
                break;
            }
        }
    }

    chatMoveStart(e)
    {
        this.chatMoving = true;
        this.mouseMoveEvent = this.chatMoveProcess.bind(this);
        this.moveLast = {x: e.clientX, y: e.clientY};

        document.addEventListener('mousemove', this.mouseMoveEvent);
        document.body.classList.add('moving');

        return false;
    }

    chatMoveEnd(e)
    {
        this.chatMoving = false;
        document.removeEventListener('mousemove', this.mouseMoveEvent);
        document.body.classList.remove('moving');

        localStorage.setItem('chat_transform', JSON.stringify({x: parseInt(this.getChat().style.right) || 0, y: this.getChatWrapper().offsetHeight}));
    }

    chatMoveProcess(e)
    {
        let chat = this.getChat();
        let chatWrapper = this.getChatWrapper();

        let move = {x: e.clientX - this.moveLast.x, y: e.clientY - this.moveLast.y}
        let right = parseInt(chat.style.right) || 0;
        let wrapperHeight = chatWrapper.offsetHeight;
        let nextMove = {x: right - move.x, y: wrapperHeight - move.y}; 

        if(0 < nextMove.x && nextMove.x < (window.innerWidth - chat.offsetWidth))
            chat.style.right = nextMove.x + 'px';

        if(0 < nextMove.y && nextMove.y < (window.innerHeight - 100))
        {
            chatWrapper.style.height = nextMove.y + 'px';
            chatWrapper.scrollTop += move.y;
        }

        this.moveLast = {x: e.clientX, y: e.clientY};
    }

    onChatChanged(component, instance)
    {
        if(this.viewportChat) 
        {
            this.viewportChat.attrs.active = false;
            this.viewportChat.viewport.instance.messagesUnload();
        }
        this.viewportChat = instance;
        this.viewportChat.attrs.active = true;
        this.viewportChat.viewport.instance.messagesLoad();

        m.redraw();
    }

    createChat(model)
    {
        let chat = new ChatPreview({
            model: model,
            store: this.store,
        });

        let chatViewport = new ChatViewport({
            chatFrame: this,
            model: model,
            messagesStorage: this.messagesStorage,
            chatPreview: chat
        });

        let chatComponent = m.component(chat);
        chat.component = chatComponent;

        let chatViewportComponent = m.component(chatViewport)
        chatViewport.component = chatViewportComponent;
        chat.viewport = {component: chatViewportComponent, instance: chatViewport};

        return (
            <div onclick={this.onChatChanged.bind(this, chatComponent, chat)}>
                {chatComponent}
            </div>
        )
    }

    apiFetchChats()
    {
        let self = this;

        this.store.find('chats').then((chats) =>
        {  
            let fetchedChats = chats.map((chat) => self.createChat(chat));
            self.chats.components = fetchedChats.concat(self.chats.components);

            m.redraw();
        });
    }

    onunload()
    {
        // onunload() is calling each route change but chat is not redrawn (beacuse of 'diff' redraw strategy, check index.js) and init() is not called too. Bug?
        // this.pusherDetach(this.pusher)
    }
}