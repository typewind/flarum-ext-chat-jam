<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Flarum\User\User;

class FetchChat
{
    /**
     * The chat message
     *
     * @var array
     */
    public $msgs;

    public $id = "FetchChat";

    /**
     * @var string
     */
    protected $type = 'chat';

    /**
     * @param int                          $postId The ID of the post to upload the image for.
     * @param UploadedFileInterface|string $file   The avatar file to upload.
     * @param User                         $actor  The user performing the action.
     */
    public function __construct(/*\array*/ $msgs)
    {
        $this->msgs = $msgs;
    }
}
