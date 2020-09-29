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
use Xelson\Chat\MessageRepository;
use Xelson\Chat\MessageValidator;
use Flarum\User\AssertPermissionTrait;

class EditMessageHandler
{
    use AssertPermissionTrait;

    /**
     * @var MessageRepository
     */
    protected $messages;

    /**
     * @var MessageValidator
     */
    protected $validator;

    /**
     * @param MessageRepository             $messages
     * @param MessageValidator              $validator
     */
    public function __construct(
        MessageRepository $messages,
        MessageValidator $validator
    ) {
        $this->messages  = $messages;
        $this->validator = $validator;
    }

    /**
     * Handles the command execution.
     *
     * @param EditMessage $command
     * @return null|string
     */
    public function handle(EditMessage $command)
    {
        $messageid = $command->id;
        $actor = $command->actor;
        $data = $command->data;

        $message = $this->messages->findOrFail($messageid);

        if(isset($data['msg']))
        {
            $this->assertCan(
                $actor,
                'pushedx-chat.permissions.edit'
            );
            $this->assertPermission($actor->id == $message->user_id);

            $message->message = $data['msg'];
            $message->edited_at = Carbon::now();
    
            $this->validator->assertValid($message->getDirty());
    
            $message->save();
    
            $message->event = 'pushedx-chat.socket.event.edit';
        }
        else if(isset($data['hide']))
        {
            $this->assertCan(
                $actor,
                'pushedx-chat.permissions.delete'
            );

            if($data['hide'])
            {
                if($message->user_id != $actor->id)
                {
                    $this->assertCan(
                        $actor,
                        'pushedx-chat.permissions.moderate.edit'
                    );
                }	
                $message->deleted_by = $actor->id;
            }
            else
            {
                if($message->deleted_by != $actor->id)
                {
                    $this->assertCan(
                        $actor,
                        'pushedx-chat.permissions.moderate.edit'
                    );
                }	
                $message->deleted_by = null;
            }

            $message->save();

            $message->invoker = $actor->id;
            $message->event = 'pushedx-chat.socket.event.edit';
        }
        $message->attributes = $data;

        return $message;
    }
}
