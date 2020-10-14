<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Xelson\Chat\Message;
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
     * @param MessageRepository             $messages
     */
    public function __construct(
        MessageRepository $messages
    ) {
        $this->messages  = $messages;
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

        $this->assertCan(
            $actor,
            'pushedx-chat.permissions.moderate.delete'
        );

		$message = $this->messages->findOrFail($messageId);
		
        $message->delete();
        $message->deleted_by = $actor->id;
        $message->deleted_forever = true;

        $message->event = 'message.delete';

        return $message;
    }
}
