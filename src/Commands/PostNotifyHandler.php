<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\Message;
use Xelson\Chat\MessageValidator;
use Xelson\Chat\MessageFloodgate;
use Flarum\User\AssertPermissionTrait;

class PostNotifyHandler
{
    /**
     * @param ChatRepository        $chats
     */
    public function __construct(ChatRepository $chats) {
        $this->chats = $chats;
    }

    /**
     * Handles the command execution.
     *
     * @param PostMessage $command
     * @return null|string
     */
    public function handle(PostNotify $command)
    {
        $actor = $command->actor;
        $attributes = $command->data['attributes'];
        $ip_address = $command->ip_address;

        $content = $attributes['message'];
        $chat_id = $attributes['chat_id'];

        $chat = $this->chats->findOrFail($chat_id, $actor);

        $message = Message::build(
            $content,
            $actor->id,
            Carbon::now(),
            $chat->id,
			$ip_address,
			1
        );

        $message->save();

        return $message;
    }
}
