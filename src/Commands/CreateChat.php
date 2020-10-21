<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Flarum\User\User;

class CreateChat
{
    /**
     * The user performing the action.
     *
     * @var User
     */
    public $actor;
 
    /**
     * Data from request
     * 
     * @var array
     */
    public $data;

    /**
     * @param User			$actor
	 * @param array			$data
     */
    public function __construct(User $actor, $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }
}