<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat;

use DateTime;
use Flarum\User\User;
use Flarum\Settings\SettingsRepositoryInterface;
use Xelson\Chat\Exceptions\FloodingException;

class MessageFloodgate
{
	/**
	 * @var SettingsRepositoryInterface
	 */
	protected $settings;

	/**
	 * @param SettingsRepositoryInterface $settings
	 */
	public function __construct(SettingsRepositoryInterface $settings)
	{
		$this->settings = $settings;
	}

	/**
	 * @param User $actor
	 * @throws FloodingException
	 */
	public function assertNotFlooding(User $actor, Chat $chat)
	{
		if($this->isFlooding($actor, $chat)) 
			throw new FloodingException;
	}

	/**
	 * @param User $actor
	 * @return bool
	 */
	public function isFlooding(User $actor, Chat $chat): bool
	{
		$number = $this->settings->get('pushedx-chat.settings.floodgate.number');
		$time = $this->settings->get('pushedx-chat.settings.floodgate.time');
		if($number <= 0) return false;
		
		$lastMessages = Message::where('created_at', '>=', new DateTime('-' . $time))
			->where('chat_id', $chat->id)
			->orderBy('id', 'DESC')
			->limit($number)
			->get();
		
		if(count($lastMessages) != $number) return false;
		foreach($lastMessages as $message)
		{
			if($message->user_id != $actor->id)
				return false;
		}
		return true;
	}
}