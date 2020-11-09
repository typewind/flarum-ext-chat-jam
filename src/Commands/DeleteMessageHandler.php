<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Xelson\Chat\Message;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\MessageRepository;
use Flarum\User\AssertPermissionTrait;

class DeleteMessageHandler
{
    use AssertPermissionTrait;

    /**
     * @var MessageRepository
     */
    protected $messages;

    /**
     * @param MessageRepository $messages
     * @param ChatRepository $chats
     */
    public function __construct(MessageRepository $messages, ChatRepository $chats) 
    {
        $this->messages  = $messages;
        $this->chats = $chats;
    }

    /**
     * Handles the command execution.
     *
     * @param DeleteMessage $command
     * @return null|string
     */
    public function handle(DeleteMessage $command)
    {
        $messageId = $command->id;
        $actor = $command->actor;

        $message = $this->messages->findOrFail($messageId);

        $this->assertPermission(
            !$message->type
        );

        $chat = $this->chats->findOrFail($message->chat_id, $actor);
        $chatUser = $chat->getChatUser($actor);

        $this->assertPermission(
            $chatUser && $chatUser->role != 0
        );
		
        $message->delete();
        $message->deleted_by = $actor->id;
        $message->deleted_forever = true;

        return $message;
    }
}
