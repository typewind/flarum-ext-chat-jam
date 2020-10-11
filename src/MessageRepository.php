<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat;

use Carbon\Carbon;
use Flarum\User\User;
use Flarum\Database\AbstractModel;
use Illuminate\Database\Eloquent\Builder;
use Flarum\Settings\SettingsRepositoryInterface;

class MessageRepository
{
    /**
     * Get a new query builder for the posts table.
     *
     * @return Builder
     */
    public function query()
    {
        return Message::query();
    }

    /**
     * Find a message by ID
     *
     * @param  int 		$id
     * @param  User 	$actor
     * @return Message
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail($id)
    {
        return $this->query()->findOrFail($id);
    }
    
    /**
     * Query for visible messages
     *
     * @param  User 	$actor
     * @return Builder
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function queryVisible(User $actor)
    {
        $settings = app(SettingsRepositoryInterface::class);

        $query = $this->query();
        if(!$actor->can('pushedx-chat.permissions.moderate.vision')) 
            $query->where(function ($query) use ($actor) {
                $query->whereNull('deleted_by')
                ->orWhere('deleted_by', $actor->id);
            });

        return $query;
    }

    /**
     * Fetching visible messages by message id
     * 
     * @param  int 		$id
     * @param  User     $actor
     * @param  int      $chat_id
     * @return array
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function fetch($id, User $actor, Chat $chat_id)
    {
        $messages = $this->queryVisible($actor);

        $list = $id ? 
            $messages->where('id', '<', $id)->where('chat_id', $chat_id->id)->orderBy('id', 'desc')->limit(20) 
            :
            $messages->where('chat_id', $chat_id->id)->orderBy('id', 'desc')->limit(20);

        return $list->get()->reverse();
    }
}