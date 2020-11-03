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
use Xelson\Chat\EventMessageChatAddRemoveUser;
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
        $current_users = $chat->users()->get();
        foreach($current_users as $user) $current_ids[] = $user['id'];
  
        $editable_colums = ['title', 'icon', 'color'];

        $events_list = [];
        $attrsChanged = false;

        $chatUser = $chat->getChatUser($actor);
        $this->assertPermission(
            $chatUser && (!$chatUser->removed_at || $chatUser->removed_by == $actor->id)
        );

        $now = Carbon::now();
        $isCreator = $actor->id == $chat->creator_id;
        $isPM = $chat->users()->count() <= 2;

        foreach($editable_colums as $column)
        {
            if(Arr::get($data, 'attributes.' . $column, 0) && $chat[$column] != $attributes[$column])
            {
                $this->assertPermission(
                    $chat->type == 1 || !$isPM
                );

                $message = $this->bus->dispatch(
                    new PostEventMessage($chat->id, $actor, new EventMessageChatEdited($column, $chat[$column], $attributes[$column]), $ip_address)
                );
                $events_list[] = $message->id;
                $chat[$column] = $attributes[$column];

                $attrsChanged = true;
            }
        }

        $added = Arr::get($data, 'users.added', 0);
        $removed = Arr::get($data, 'users.removed', 0);

        if($added || $removed)
        {
            $this->assertPermission(
                !$isPM
            );

            // Редактирование списка пользователей:
            // Учесть работу для каналов (если это вообще надо)
            // Большая красная кнопка удалить для админов

            $added_ids = []; $removed = [];
            foreach($added as $user) $added_ids[] = $user['id'];
            foreach($removed as $user) $removed_ids[] = $user['id'];
            $added_ids = array_unique($added_ids);
            $removed_ids = array_unique($removed_ids);

            if(count(array_intersect($added_ids, $removed_ids))) 
                throw new ChatEditException;

            if(count(array_intersect($added_ids, $current_ids)) || !count(array_intersect($removed_ids, $current_ids)))
                throw new ChatEditException;

            if(count($added_ids) || count($removed_ids))
            {
                $this->assertPermission(
                    $isCreator
                );
                
                $message = $this->bus->dispatch(
                    new PostEventMessage($chat->id, $actor, new EventMessageChatAddRemoveUser($added_ids, $removed_ids), $ip_address)
                );
                $events_list[] = $message->id;

                foreach($added_ids as $k => $v)
                    $added_ids[$v] = ['removed_at' => null, 'removed_by' => null];

                foreach($removed_ids as $k => $v)
                    $removed_ids[$v] = ['removed_at' => $now, 'removed_by' => $actor->id];

                $chat->users()->syncWithoutDetaching(array_merge($added_ids, $removed_ids));
            }

            $index = 0;
            if(($index = array_search($actor->id, $added_ids)) !== false) 
            {
                $event = new EventMessageChatAddRemoveUser([$user['id']], []);
                array_splice($added_ids, $index, 1);

                $chat->users()->updateExistingPivot($actor->id, ['removed_at' => null, 'removed_by' => null]);
            }
            if(($index = array_search($actor->id, $removed_ids)) !== false) 
            {
                $event = new EventMessageChatAddRemoveUser([], [$user['id']]);
                array_splice($removed_ids, $index, 1);

                $chat->users()->updateExistingPivot($actor->id, ['removed_at' => $now, 'removed_by' => $actor->id]);
            }
            if($event)
            {
                $message = $this->bus->dispatch(
                    new PostEventMessage($chat->id, $actor, $event, $ip_address)
                );
                $events_list[] = $message->id;
            }
        }

        $edited = Arr::get($data, 'users.edited', 0);
        if($edited)
        {
            $this->assertPermission(
                !$isPM && $isCreator
            );

            // Реализовать проверку доступа на действия как от лица модератора. Назначать модераторов может только создатель, но не себя
            // Учесть работу для каналов (если это вообще надо)

            $syncUsers = [];

            foreach($edited as $user)
            {
                $id = $user['id'];
                $role = $user['role'];

                if(array_search($id, $current_ids) === false || $id == $actor->id)
                    throw new ChatEditException;

                if($role != 0 && $role != 1)
                    throw new ChatEditException;

                $syncUsers[$id] = ['role' => $role];
            }

            $chat->users()->syncWithoutDetaching($syncUsers);
        }

        if($attrsChanged) $chat->save();
        $chat->eventmsg_range = $events_list;

        return $chat;
    }
}