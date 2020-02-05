<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Xelson\Chat\Message;
use Xelson\Chat\MessageValidator;
use Flarum\User\AssertPermissionTrait;

class PostChatHandler
{
    use AssertPermissionTrait;

    /**
     * @var MessageValidator
     */
    protected $validator;

    /**
     * @param MessageValidator              $validator
     */
    public function __construct(MessageValidator $validator) 
    {
        $this->validator = $validator;
    }

    /**
     * Handles the command execution.
     *
     * @param PostChat $command
     * @return null|string
     */
    public function handle(PostChat $command)
    {
        $actor = $command->actor;
        $content = $command->msg;

        $this->assertCan(
            $actor,
            'pushedx-chat.permissions.chat'
        );

        $message = Message::build(
            $content,
            $actor->id,
            Carbon::now()
        );

        $this->validator->assertValid($message->getDirty());

        $message->save();

        $message->event = 'pushedx-chat.socket.event.post';

        return $message;
    }
}
