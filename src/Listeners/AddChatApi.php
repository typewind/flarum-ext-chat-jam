<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Listeners;

use Xelson\Chat\Api\Controllers\PostMessageController;
use Xelson\Chat\Api\Controllers\FetchMessageController;
use Xelson\Chat\Api\Controllers\EditMessageController;
use Xelson\Chat\Api\Controllers\DeleteMessageController;
use Xelson\Chat\Api\Controllers\ShowUserSafeController;
use Xelson\Chat\Api\Controllers\ListChatsController;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiRoutes;
use Flarum\Api\Event\Serializing;
use Illuminate\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;

class AddChatApi
{
    protected $settings;
    
    public function __construct(SettingsRepositoryInterface $settings) 
    {
        $this->settings = $settings;
    }

    /**
     * Subscribes to the Flarum api routes configuration event.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * Registers our routes.
     *
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->get('/chats', 'pushedx.chat.get', ListChatsController::class);
        $event->get('/chatmessages', 'pushedx.chat.fetch', FetchMessageController::class);
        $event->post('/chatmessages', 'pushedx.chat.post', PostMessageController::class);
        $event->patch('/chatmessages/{id}', 'pushedx.chat.edit', EditMessageController::class);
        $event->delete('/chatmessages/{id}', 'pushedx.chat.delete', DeleteMessageController::class);

        $event->get('/chat/user/{id}', 'pushedx.chat.user', ShowUserSafeController::class);
    }

    /**
     * Gets the api attributes and makes them available to the forum.
     *
     * @param Serializing $event
     */
    public function prepareApiAttributes(Serializing $event)
    {
        if($event->isSerializer(ForumSerializer::class)) 
        {
            $permissions = [
                'pushedx-chat.permissions.chat', 
                'pushedx-chat.permissions.edit',
                'pushedx-chat.permissions.delete', 
                'pushedx-chat.permissions.moderate.delete',
                'pushedx-chat.permissions.moderate.vision'
            ];

            $attributes = [
                'pushedx-chat.settings.charlimit',
                'pushedx-chat.settings.display.minimize',
                'pushedx-chat.settings.display.censor'
            ];

            foreach($permissions as $permission)
                $event->attributes[$permission] = $event->actor->can($permission);

            foreach($attributes as $attribute)
                $event->attributes[$attribute] = $this->settings->get($attribute);
        }
    }
}
