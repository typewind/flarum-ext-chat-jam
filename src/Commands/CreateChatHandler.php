<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Flarum\User\AssertPermissionTrait;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\ChatUser;
use Xelson\Chat\Chat;
use Xelson\Chat\Exceptions\ChatEditException;

class CreateChatHandler
{
	use AssertPermissionTrait;

	/**
     * @param ChatRepository $chats
     * @param ChatSocket $socket
     */
	public function __construct(ChatRepository $chats, ChatSocket $socket) 
	{
        $this->chats  = $chats;
        $this->socket = $socket;
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

        $isChannel = $attributes['isChannel'];

        $this->assertCan(
            $actor,
            $isChannel ? 'pushedx-chat.permissions.create.channel' : 'pushedx-chat.permissions.create'
        );

        foreach($users as $key => $user)
        {
            if($user['id'] == $actor->id)
                array_splice($users, $key, 1);
        }
        array_push($users, ['id' => $actor->id, 'type' => 'users']);

        if(count($users) < 2)
            throw new ChatEditException;

        if(count($users) == 2)
        {
            $chats = $this->chats->query()->where('type', 0)->whereIn('id', ChatUser::select('chat_id')->where('user_id', $actor->id)->get()->toArray())->with('users')->get();

            foreach($chats as $chat)
            {
                $chatUsers = $chat->users;

                if(count($chatUsers) == 2 && ($chatUsers[0]->id == $users[0]['id'] || $chatUsers[1]->id == $users[0]['id']))
                    throw new ChatEditException;
            }
        }
        else
        {


        }

		// Личный чат между двумя пользователями не существует (валидация на фронте тоже должна быть)
		// Хендлим список айдишников пользователей для добавления в чат. В конце чат должен быть создан и данные
		// отосланы по сокету. Но сообщение сокета может прийти раньше чем http ответ (надо учесть)
		// Пользователь должен иметь возможность запретить приглашать себя куда либо
		// По-хорошему код на изменение чата (тайтл, участники) должен быть переиспользован, т.к у нас еще будет команда EditChat
		// Необходимо ввести тип сообщений для служебных уведомлений об событиях (создание чата, добавление юзеров) 

        return null;
    }
}