import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('pushedx-chat', (app) => {
    app.extensionData
        .for('pushedx-chat')
        .registerSetting({
            setting: 'pushedx-chat.settings.charlimit',
            label: app.translator.trans('pushedx-chat.admin.settings.charlimit'),
            type: 'number'
        })
        .registerSetting({
            setting: 'pushedx-chat.settings.floodgate.number',
            label: app.translator.trans('pushedx-chat.admin.settings.floodgate.number'),
            type: 'number'
        })
        .registerSetting({
            setting: 'pushedx-chat.settings.floodgate.time',
            label: app.translator.trans('pushedx-chat.admin.settings.floodgate.time'),
            type: 'text'
        })
        .registerSetting({
            setting: 'pushedx-chat.settings.display.minimize',
            label: 'pushedx-chat.admin.settings.display.minimize',
            type: 'switch'
        })
        .registerSetting({
            setting: 'pushedx-chat.settings.display.censor',
            label: app.translator.trans('pushedx-chat.admin.settings.display.censor'),
            type: 'switch'
        })
        .registerPermission({
            icon: 'fas fa-eye',
            label: app.translator.trans('pushedx-chat.admin.permissions.enabled'),
            permission: 'pushedx-chat.permissions.enabled',
            allowGuest: true,
        }, 'view')
        .registerPermission({
            icon: 'fas fa-comment-medical',
            label: app.translator.trans('pushedx-chat.admin.permissions.create'),
            permission: 'pushedx-chat.permissions.create'
        }, 'start')
        .registerPermission({
            icon: 'fas fa-comment-medical',
            label: app.translator.trans('pushedx-chat.admin.permissions.create.channel'),
            permission: 'pushedx-chat.permissions.create.channel',
        }, 'start')
        .registerPermission({
            icon: 'fas fa-comments',
            label: app.translator.trans('pushedx-chat.admin.permissions.post'),
            permission: 'pushedx-chat.permissions.chat',
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-pencil-alt',
            label: app.translator.trans('pushedx-chat.admin.permissions.edit'),
            permission: 'pushedx-chat.permissions.edit',
        }, 'reply')
        .registerPermission({
            icon: 'far fa-trash-alt',
            label: app.translator.trans('pushedx-chat.admin.permissions.delete'),
            permission: 'pushedx-chat.permissions.delete',
        }, 'reply')
});
