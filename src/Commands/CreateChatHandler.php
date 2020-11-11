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
use Flarum\User\User;
use Illuminate\Support\Arr;
use Xelson\Chat\Chat;
use Xelson\Chat\ChatUser;
use Xelson\Chat\ChatValidator;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\EventMessageChatCreated;
use Xelson\Chat\Commands\PostEventMessage;
use Xelson\Chat\Exceptions\ChatEditException;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;

class CreateChatHandler
{
	use AssertPermissionTrait;

	/**
     * @param ChatValidator $validator
     * @param ChatRepository $chats
     * @param ChatSocket $socket
     */
	public function __construct(ChatValidator $validator, ChatRepository $chats, BusDispatcher $bus) 
	{
        $this->validator = $validator;
        $this->chats  = $chats;
        $this->bus = $bus;
	}
	
    /**
     * Handles the command execution.
     *
     * @param CreateChat $command
     * @return null|string
     */
    public function handle(CreateChat $command)
    {
		$actor = $command->actor;
        $data = $command->data;
        $users = Arr::get($data, 'relationships.users.data', []);
        $attributes = Arr::get($data, 'attributes', []);
        $ip_address = $command->ip_address;

        $isChannel = $attributes['isChannel'];

        $this->assertCan(
            $actor,
            $isChannel ? 'pushedx-chat.permissions.create.channel' : 'pushedx-chat.permissions.create'
        );

        $invited = [];

        foreach($users as $key => $user)
        {
            if(array_key_exists($user['id'], $invited))
                throw new ChatEditException;

            $invited[$user['id']] = true;
            if($user['id'] == $actor->id)
                array_splice($users, $key, 1);
        }
        array_push($users, ['id' => $actor->id, 'type' => 'users']);

        if(!$isChannel && count($users) < 2)
            throw new ChatEditException;

        if(count($users) == 2)
        {
            $chats = $this->chats->query()
                ->where('type', 0)
                ->whereIn('id', ChatUser::select('chat_id')->where('user_id', $actor->id)->get()->toArray())
                ->with('users')
                ->get();

            foreach($chats as $chat)
            {
                $chatUsers = $chat->users;

                if(count($chatUsers) == 2 && 
                    ($chatUsers[0]->id == $users[0]['id'] || $chatUsers[0]->id == $users[1]['id']) &&
                    ($chatUsers[1]->id == $users[0]['id'] || $chatUsers[1]->id == $users[1]['id'])
                )
                    throw new ChatEditException;
            }
        }

        $now = Carbon::now();
        $color = Arr::get($data, 'attributes.color', sprintf('#%06X', mt_rand(0x222222, 0xFFFF00)));
        $icon = Arr::get($data, 'attributes.icon', '');

        $chat = Chat::build(
            $attributes['title'],
            $color,
            $icon,
            $isChannel,
            $actor->id,
            Carbon::now()
        );

        $this->validator->assertValid($chat->getDirty());
        $chat->save();

        $user_ids = [];
        
        if(!$isChannel)
        {
            foreach($users as $user) if($user['id'] != $actor->id) $user_ids[] = $user['id'];

            $pairs = array_merge($user_ids, [$actor->id]);
            foreach($pairs as $k => $v)
            {
                $pairs[$v] = ['joined_at' => $now];
                if($v == $actor->id) $pairs[$v]['role'] = 2;
            }
            
            try {
                $chat->users()->sync($pairs);
            } catch (Exception $e) {
                $chat->delete();
                throw $e;
            }
        }
        else
        {
            try {
                $chat->users()->sync([$actor->id => ['role' => 2, 'joined_at' => $now]]);
            } catch (Exception $e) {
                $chat->delete();
                throw $e;
            }
        }

        $eventMessage = $this->bus->dispatch(
            new PostEventMessage($chat->id, $actor, new EventMessageChatCreated($user_ids), $ip_address)
        );
        
		// Пользователь должен иметь возможность запретить приглашать себя куда либо

        return $chat;
    }
}