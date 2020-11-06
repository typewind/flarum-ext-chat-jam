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
use Xelson\Chat\Exceptions\ChatEditException;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;

class DeleteChatHandler
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
     * @param DeleteChat $command
     * @return null|string
     */
    public function handle(DeleteChat $command)
    {
		$chat_id = $command->chat_id;
		$actor = $command->actor;

        $chat = $this->chats->findOrFail($chat_id, $actor);
        
        $users = $chat->users()->get();

        $this->assertPermission(
            $chat->creator_id == $actor->id && count($users) > 2
		);
		
		$chat->users()->detach();
		$chat->delete();

        return $chat;
    }
}