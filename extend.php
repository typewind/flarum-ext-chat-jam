<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

use Xelson\Chat\Api\Controllers\PostMessageController;
use Xelson\Chat\Api\Controllers\FetchMessageController;
use Xelson\Chat\Api\Controllers\EditMessageController;
use Xelson\Chat\Api\Controllers\DeleteMessageController;
use Xelson\Chat\Api\Controllers\ShowUserSafeController;
use Xelson\Chat\Api\Controllers\ListChatsController;
use Xelson\Chat\Api\Controllers\CreateChatController;
use Xelson\Chat\Api\Controllers\DeleteChatController;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin/settingsPage.less')
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/forum/chat.less')
        ->js(__DIR__ . '/js/dist/forum.js'),
    (new Extend\Locales(__DIR__ . '/resources/locale')),
    (new Extend\Routes('api'))
        ->get('/chats', 'neonchat.chats.get', ListChatsController::class)
        ->post('/chats', 'neonchat.chats.create', CreateChatController::class)
        ->delete('/chats/{id}', 'neonchat.chats.delete', DeleteChatController::class)
        ->get('/chatmessages', 'neonchat.chatmessages.fetch', FetchMessageController::class)
        ->post('/chatmessages', 'neonchat.chatmessages.post', PostMessageController::class)
        ->patch('/chatmessages/{id}', 'neonchat.chatmessages.edit', EditMessageController::class)
        ->delete('/chatmessages/{id}', 'neonchat.chatmessages.delete', DeleteMessageController::class)

        ->get('/chat/user/{id}', 'neonchat.chat.user', ShowUserSafeController::class),

    function (Dispatcher $events, Application $app) {
        $events->subscribe(Listeners\AddChatApi::class);
    }
];
