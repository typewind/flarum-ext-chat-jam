import {extend} from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import ChatFrame from './components/ChatFrame';

import extendGlobalStore from './store';
import Chat from './models/Chat';
import Message from './models/Message';
import ChatState from './states/ChatState';

var moduleInited = false;

app.initializers.add('pushedx-chat', app =>
{    
    extend(HeaderPrimary.prototype, 'items', function(items) 
    {
        if(!app.forum.attribute('pushedx-chat.permissions.enabled')) return;

        if(!moduleInited)
        {
            moduleInited = true

            ChatState.init();
            extendGlobalStore({
                chats: Chat,
                chatmessages: Message
            });
        }

        items.add('pushedx-chat-frame', <ChatFrame />);
    });
});
