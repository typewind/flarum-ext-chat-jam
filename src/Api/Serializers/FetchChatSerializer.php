<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Serializers;

use Carbon\Carbon;
use Flarum\Api\Serializer\AbstractSerializer;

class FetchChatSerializer extends AbstractSerializer
{

    /**
     * @var string
     */
    protected $type = 'chat';

    /**
     *
     * @param  object|array         $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        $ret = ['messages' => []];

        foreach($model->messages as $msg) 
        {
            $msg->created_at = $this->formatDate(new Carbon($msg->created_at));
            if($msg->edited_at) $msg->edited_at = $this->formatDate(new Carbon($msg->edited_at));
            $ret['messages'][] = $msg;
        }
        return $ret;
    }
}
