<?php

use Illuminate\Database\Schema\Builder;
use Illuminate\Database\Schema\Blueprint;

return [
    'up' => function (Builder $schema) {
        $schema->table('neonchat_chats', function (Blueprint $table) {
            $table->string('icon', 100)->nullable();
        });

        $schema->table('neonchat_chat_user', function (Blueprint $table) {
            $table->integer('unreaded')->default(0);
            $table->boolean('is_ignoring')->default(0);
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('neonchat_chats', function (Blueprint $table) {
            $table->dropColumn('icon');
        });

        $schema->table('neonchat_chat_user', function (Blueprint $table) {
            $table->dropColumn('unreaded');
            $table->dropColumn('is_ignoring');
        });
    }
];
