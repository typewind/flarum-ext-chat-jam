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
use Illuminate\Support\Arr;
use Tobscure\JsonApi\Resource;

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
        $attributes = Arr::get($data, 'attributes', []);
        $actions = $attributes['actions'];

        $message = $this->messages->findOrFail($messageid);

        if(isset($actions['msg']))
        {
            $this->assertCan(
                $actor,
                'pushedx-chat.permissions.edit'
            );
            $this->assertPermission($actor->id == $message->user_id);

            $message->message = $actions['msg'];
            $message->edited_at = Carbon::now();
    
            $this->validator->assertValid($message->getDirty());
    
            $message->save();
        }
        else if(isset($actions['hide']))
        {
            $this->assertCan(
                $actor,
                'pushedx-chat.permissions.delete'
            );

            if($actions['hide'])
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
            $actions['invoker'] = $actor->id;
        }
        $message->actions = $actions;
        $message->event = 'message.edit';

        return $message;
    }
}
