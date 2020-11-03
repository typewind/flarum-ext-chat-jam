<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Serializers;

use Flarum\Api\Serializer\UserSerializer;

class UserChatSerializer extends UserSerializer
{
    /**
     * @param \Flarum\User\User $user
     * @return array
     */
    protected function getDefaultAttributes($user)
    {
		$attributes = parent::getDefaultAttributes($user);
		
		$attributes += [
			'chat_pivot' => [
				$user->pivot->chat_id => [
					'role' => $user->pivot->role,
					'joined_at' => $user->pivot->joined_at,
					'readed_at' => $user->pivot->readed_at,
					'removed_at' => $user->pivot->removed_at,
					'removed_by' => $user->pivot->removed_by
				]
			]
		];
		
		return $attributes;
	}
}