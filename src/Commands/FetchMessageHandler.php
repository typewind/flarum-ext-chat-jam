<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Xelson\Chat\ChatRepository;
use Xelson\Chat\MessageRepository;

class FetchMessageHandler
{
    /**
     * @var MessageRepository
     */
    protected $messages;

    /**
     * @param MessageRepository             $messages
     * @param ChatRepository                $chats
     */
    public function __construct(
        MessageRepository $messages,
        ChatRepository $chats) 
    {
        $this->messages  = $messages;
        $this->chats = $chats;
    }

    /**
     * Handles the command execution.
     *
     * @return null|string
     *
     */
    public function handle(FetchMessage $command)
    {
        $actor = $command->actor;
        $start_from = $command->start_from;
 
        $chat_id = $this->chats->findOrFail($command->chat_id, $actor);
        $messages = $this->messages->fetch($start_from, $actor, $chat_id);

        return $messages;
    }
}
