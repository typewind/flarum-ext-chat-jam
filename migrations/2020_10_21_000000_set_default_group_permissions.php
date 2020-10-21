<?php

use Flarum\Group\Group;
use Illuminate\Database\Schema\Builder;

$rows = [
    ['permission' => 'pushedx-chat.permissions.enabled', 'group_id' => Group::GUEST_ID],

    ['permission' => 'pushedx-chat.permissions.chat', 'group_id' => Group::MEMBER_ID],
    ['permission' => 'pushedx-chat.permissions.create', 'group_id' => Group::MEMBER_ID],
	['permission' => 'pushedx-chat.permissions.edit', 'group_id' => Group::MEMBER_ID],
	['permission' => 'pushedx-chat.permissions.delete', 'group_id' => Group::MEMBER_ID],

    ['permission' => 'pushedx-chat.permissions.create.channel', 'group_id' => Group::MODERATOR_ID],
	['permission' => 'pushedx-chat.permissions.moderate.delete', 'group_id' => Group::MODERATOR_ID],
	['permission' => 'pushedx-chat.permissions.moderate.vision', 'group_id' => Group::MODERATOR_ID],
];

return [
    'up' => function (Builder $schema) use ($rows) {
        $db = $schema->getConnection();

        foreach ($rows as $row) {
            if ($db->table('groups')->where('id', $row['group_id'])->doesntExist()) {
                continue;
            }

            if ($db->table('group_permission')->where($row)->doesntExist()) {
                $db->table('group_permission')->insert($row);
            }
        }
    },

    'down' => function (Builder $schema) use ($rows) {
        $db = $schema->getConnection();

        foreach ($rows as $row) {
            $db->table('group_permission')->where($row)->delete();
        }
    }
];