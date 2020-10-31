<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\EventMessageChatEdited;
use Xelson\Chat\Commands\PostEventMessage;
use Xelson\Chat\Exceptions\ChatEditException;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;

class EditChatHandler
{
	use AssertPermissionTrait;

	/**
     * @param ChatRepository $chats
     * @param ChatSocket $socket
     */
	public function __construct(ChatRepository $chats, BusDispatcher $bus) 
	{
        $this->chats  = $chats;
        $this->bus = $bus;
	}
	
    /**
     * Handles the command execution.
     *
     * @param EditChat $command
     * @return null|string
     */
    public function handle(EditChat $command)
    {
		$chat_id = $command->chat_id;
		$actor = $command->actor;
        $data = $command->data;
        $attributes = Arr::get($data, 'attributes', []);
        $ip_address = $command->ip_address;

        $chat = $this->chats->findOrFail($chat_id, $actor);

        $readed_at = Arr::get($data, 'attributes.actions.reading', 0);
        if($readed_at)
        {
            $chatUser = $chat->getChatUser($actor);
            if($chatUser) $chat->users()->updateExistingPivot($actor->id, ['readed_at' => new Carbon($readed_at)]);
        }
        
        $editable_colums = ['title', 'icon', 'color'];
        $events_list = [];
        $edited = false;

        foreach($editable_colums as $column)
        {
            if(Arr::get($data, 'attributes.' . $column, 0) && $chat[$column] != $attributes[$column])
            {
                $message = $this->bus->dispatch(
                    new PostEventMessage($chat->id, $actor, new EventMessageChatEdited($column, $chat[$column],$attributes[$column]), $ip_address)
                );
                $events_list[] = $message->id;
                $chat[$column] = $attributes[$column];

                $edited = true;
            }
        }

        if($edited) $chat->save();
        $chat->eventmsg_range = $events_list;

        return $chat;
    }
}