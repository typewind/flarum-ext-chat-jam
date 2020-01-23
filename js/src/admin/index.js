import {extend}  from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import ChatSettingsModal from './components/ChatSettingsModal'

app.initializers.add('pushedx-chat', app => {
    app.extensionSettings['xelson-chat'] = () => app.modal.show(new ChatSettingsModal());

    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('realtimeChat', {
            icon: 'weixin',
            label: 'Realtime Chat',
            permission: 'pushedx-chat.canchat'
        });
    });
});
