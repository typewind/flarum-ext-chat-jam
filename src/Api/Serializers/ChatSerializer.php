<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Serializers;

use Xelson\Chat\PusherWrapper;
use Flarum\User\User;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ChatSerializer extends AbstractSerializer
{
    /**
     * @var string
     */
    protected $type = 'chatmessage';

    /**
     * @var PusherWrapper
     */
    protected $pusher;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var User
     */
    protected $actor;

    /**
     * @param PusherWrapper                 $pusher
     */
    public function __construct(
        PusherWrapper $pusher,
        SettingsRepositoryInterface $settings,
        User $actor
    ) 
    {
        $this->pusher = $pusher->pusher;
        $this->settings = $settings;
        $this->actor = $actor;
    }

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param object|array $model
     * @return array
     */
    protected function getDefaultAttributes($message)
    {
        $attributes = $message->getAttributes();
        $attributes['created_at'] = $this->formatDate($message->created_at);
        if($attributes['edited_at']) $attributes['edited_at'] = $this->formatDate($message->edited_at);
        if($this->settings->get('pushedx-chat.settings.display.censor') && !$this->actor->id)
        {
            $attributes['message'] = str_repeat("*", strlen($attributes['message']));
            $attributes['censored'] = true;
        }
        if(array_key_exists('event', $attributes)) $this->pusher->trigger('public', $attributes['event'], $attributes);

        return $attributes;
    }
}
