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
     * The chat message ID
     *
     * @var int
     */
    public $id;

    /**
     * @param int     $id
     */
    public function __construct($start_from, $actor, $chat_id)
    {
        $this->start_from = $start_from;
        $this->actor = $actor;
        $this->chat_id = $chat_id;
    }
}
