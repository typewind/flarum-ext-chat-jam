import {extend} from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import ChatFrame from './components/ChatFrame';

import extendGlobalStore from './store';
import Chat from './models/Chat';
import Message from './models/Message';

app.initializers.add('pushedx-chat', app =>
{
    extend(HeaderPrimary.prototype, 'items', function(items) 
    {
        extendGlobalStore({
            chats: Chat,
            chatmessages: Message
        });

        m.redraw.strategy('diff');
        items.add('pushedx-chat-frame', <ChatFrame />);
    });
});
