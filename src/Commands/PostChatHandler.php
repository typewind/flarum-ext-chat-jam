<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Xelson\Chat\Message;
use Xelson\Chat\PusherWrapper;
use Flarum\User\AssertPermissionTrait;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Events\Dispatcher;

class PostChatHandler
{
    use DispatchEventsTrait;
    use AssertPermissionTrait;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var PusherWrapper
     */
    protected $pusher;

    /**
     * @param Dispatcher                    $events
     * @param Application                   $app
     * @param SettingsRepositoryInterface   $settings
     * @param PusherWrapper                 $pusher
     */
    public function __construct(
        Dispatcher $events,
        Application $app,
        SettingsRepositoryInterface $settings,
        PusherWrapper $pusher
    ) {
        $this->events    = $events;
        $this->app       = $app;
        $this->settings  = $settings;
        $this->pusher    = $pusher->pusher;
    }

    /**
     * Handles the command execution.
     *
     * @param PostChat $command
     * @return null|string
     */
    public function handle(PostChat $command)
    {
        $actor = $command->actor;
        $content = $command->msg;

        $this->assertCan(
            $actor,
            'pushedx-chat.permissions.chat'
        );

        $content = trim($content);
        if(strlen($content) > $this->settings->get('pushedx-chat.charlimit')) return null;

        $message = Message::build(
            $content,
            $actor->id,
            Carbon::now()
        );
        $message->save();

        $msg = [
            'id' => $message->id,
            'actorId' => $actor->id,
            'message' => $content
        ];
        $this->pusher->trigger('public', 'eventPost', $msg);

        return $content;
    }
}
