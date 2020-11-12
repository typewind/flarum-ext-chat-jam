import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import ChatFrame from './components/ChatFrame';

import extendGlobalStore from './store';
import Chat from './models/Chat';
import Message from './models/Message';
import User from 'flarum/models/User';
import Model from 'flarum/Model';
import ChatState from './states/ChatState';

var moduleInited = false;

app.initializers.add('pushedx-chat', (app) => {
    extend(HeaderPrimary.prototype, 'items', function (items) {
        if (!app.forum.attribute('pushedx-chat.permissions.enabled')) return;

        if (!moduleInited) {
            moduleInited = true;

            ChatState.init();
            extendGlobalStore({
                chats: Chat,
                chatmessages: Message,
            });

            function pivot(name, id, attr, transform) {
                pivot.hasOne = function (name, id, attr) {
                    return function () {
                        const relationship = this.data.attributes[name] && this.data.attributes[name][id] && this.data.attributes[name][id][attr];
                        if (relationship) return app.store.getById(relationship.data.type, relationship.data.id);
                    };
                };

                return function () {
                    const value = this.data.attributes[name] && this.data.attributes[name][id] && this.data.attributes[name][id][attr];
                    return transform ? transform(value) : value;
                };
            }

            Object.assign(User.prototype, {
                chat_pivot(chat_id) {
                    return {
                        role: pivot('chat_pivot', chat_id, 'role').bind(this),
                        removed_by: pivot('chat_pivot', chat_id, 'removed_by').bind(this),
                        readed_at: pivot('chat_pivot', chat_id, 'readed_at', Model.transformDate).bind(this),
                        removed_at: pivot('chat_pivot', chat_id, 'removed_at', Model.transformDate).bind(this),
                        joined_at: pivot('chat_pivot', chat_id, 'joined_at', Model.transformDate).bind(this),
                    };
                },
            });
        }

        items.add('pushedx-chat-frame', <ChatFrame />);
    });
});
