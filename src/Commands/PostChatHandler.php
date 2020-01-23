<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Xelson\Chat\Api\Controllers\FetchChatController;
use Flarum\User\AssertPermissionTrait;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Events\Dispatcher;
use DateTime;
use Pusher;

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
     * @param Dispatcher                  $events
     * @param Application                 $app
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(
        Dispatcher $events,
        Application $app,
        SettingsRepositoryInterface $settings
    ) {
        $this->events    = $events;
        $this->app       = $app;
        $this->settings  = $settings;
    }

    /**
     * Handles the command execution.
     *
     * @param UploadImage $command
     * @return null|string
     */
    public function handle(PostChat $command)
    {
        $this->assertCan(
            $command->actor,
            'pushedx-chat.canchat'
        );

        $command->msg = trim($command->msg);
        if(strlen($command->msg) > $this->settings->get('pushedx-chat.charlimit')) return null;

        $msg = [
            'actorId' => $command->actor->id,
            'message' => $command->msg
        ];

        $message = FetchChatController::UpdateMessages($msg);
        $msg['id'] = $message->id;
        $msg['created_at'] = $message->created_at->format(DateTime::RFC3339);

        $pusher = $this->getPusher();
        $pusher->trigger('public', 'newChat', $msg);

        return $command->msg;
    }

    /**
     * @return Pusher
     */
    protected function getPusher()
    {
        return new Pusher(
            $this->settings->get('flarum-pusher.app_key'),
            $this->settings->get('flarum-pusher.app_secret'),
            $this->settings->get('flarum-pusher.app_id'),
            ['cluster' => $this->settings->get('flarum-pusher.app_cluster')]
        );
    }
}
