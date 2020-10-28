import {extend}  from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import ChatSettingsModal from './components/ChatSettingsModal'

app.initializers.add('pushedx-chat', app => {
    app.extensionSettings['xelson-chat'] = () => app.modal.show(ChatSettingsModal);

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('pushedx-chat.permissions.enabled', {
            icon: 'fas fa-eye',
            label: app.translator.trans('pushedx-chat.admin.permissions.enabled'),
            permission: 'pushedx-chat.permissions.enabled',
            allowGuest: true
        });
    });

    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('pushedx-chat.permissions.create', {
            icon: 'fas fa-comment-medical',
            label: app.translator.trans('pushedx-chat.admin.permissions.create'),
            permission: 'pushedx-chat.permissions.create'
        });
        items.add('pushedx-chat.permissions.create.channel', {
            icon: 'fas fa-comment-medical',
            label: app.translator.trans('pushedx-chat.admin.permissions.create.channel'),
            permission: 'pushedx-chat.permissions.create.channel'
        });
    });

    extend(PermissionGrid.prototype, 'replyItems', items => {
        items.add('pushedx-chat.permissions.chat', {
            icon: 'fas fa-comments',
            label: app.translator.trans('pushedx-chat.admin.permissions.post'),
            permission: 'pushedx-chat.permissions.chat'
        });
        items.add('pushedx-chat.permissions.edit', {
            icon: 'fas fa-pencil-alt',
            label: app.translator.trans('pushedx-chat.admin.permissions.edit'),
            permission: 'pushedx-chat.permissions.edit'
        });
        items.add('pushedx-chat.permissions.delete', {
            icon: 'far fa-trash-alt',
            label: app.translator.trans('pushedx-chat.admin.permissions.delete'),
            permission: 'pushedx-chat.permissions.delete'
        });
    });

    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('pushedx-chat.permissions.moderate.delete', {
            icon: 'far fa-trash-alt',
            label: app.translator.trans('pushedx-chat.admin.permissions.moderate.delete'),
            permission: 'pushedx-chat.permissions.moderate.delete'
        });
        items.add('pushedx-chat.permissions.moderate.vision', {
            icon: 'far fa-eye',
            label: app.translator.trans('pushedx-chat.admin.permissions.moderate.vision'),
            permission: 'pushedx-chat.permissions.moderate.vision'
        });
    });
});
