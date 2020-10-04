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

class Chat extends AbstractModel
{
    protected $table = 'neonchat_chats';

    protected $dates = ['created_at'];

    /**
     * Create a new message.
     *
     * @param string    $message
     * @param int       $color
     * @param int    	$type
     * @param int       $creator_id
	 * @param Carbon    $created_at
     * 
     */
    public static function build($title, $color, $type, $creator_id = null, $created_at = null)
    {
        $chat = new static;

        $chat->title = $title;
        $chat->color = $color;
        $chat->type = $type;
        $chat->creator_id = $creator_id;
        $chat->created_at = $created_at;

        return $chat;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'neonchat_chat_user');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function last_message()
    {
        return $this->hasOne(Message::class)->orderBy('id', 'desc')->whereNull('deleted_by');
    }
}
