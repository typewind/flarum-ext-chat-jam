<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
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
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
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
                'xelson-chat.permissions.chat', 
                'xelson-chat.permissions.create',
                'xelson-chat.permissions.create.channel',
                'xelson-chat.permissions.enabled',
                'xelson-chat.permissions.edit',
                'xelson-chat.permissions.delete'
            ];

            $attributes = [
                'xelson-chat.settings.charlimit',
                'xelson-chat.settings.display.minimize',
                'xelson-chat.settings.display.censor'
            ];

            foreach($permissions as $permission)
                $event->attributes[$permission] = $event->actor->can($permission);

            foreach($attributes as $attribute)
                $event->attributes[$attribute] = $this->settings->get($attribute);
        }
    }
}
