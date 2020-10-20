<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Flarum\User\User;

class FetchMessage
{
    /**
     * @var int
     */
    public $start_from;

    /**
     * @var User
     */
    public $actor;

    /**
     * @var int
     */
    public $chat_id;

    /**
     * @param int $start_from
     * @param User $actor
     * @param int $chat_id
     */
    public function __construct(int $start_from, User $actor, int $chat_id)
    {
        $this->start_from = $start_from;
        $this->actor = $actor;
        $this->chat_id = $chat_id;
    }
}
