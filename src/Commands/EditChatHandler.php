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
use Xelson\Chat\MessageRepository;
use Xelson\Chat\PusherWrapper;
use Flarum\User\AssertPermissionTrait;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Events\Dispatcher;

class EditChatHandler
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
     * @var MessageRepository
     */
    protected $messages;

    /**
     * @param Dispatcher                    $events
     * @param Application                   $app
     * @param SettingsRepositoryInterface   $settings
     * @param PusherWrapper                 $pusher
     * @param MessageRepository             $messages
     */
    public function __construct(
        Dispatcher $events,
        Application $app,
        SettingsRepositoryInterface $settings,
        PusherWrapper $pusher,
        MessageRepository $messages
    ) {
        $this->events    = $events;
        $this->app       = $app;
        $this->settings  = $settings;
        $this->pusher    = $pusher->pusher;
        $this->messages  = $messages;
    }

    /**
     * Handles the command execution.
     *
     * @param EditChat $command
     * @return null|string
     */
    public function handle(EditChat $command)
    {
        $messageid = $command->id;
        $actor = $command->actor;
        $content = $command->msg;

        $this->assertCan(
            $actor,
            'pushedx-chat.permissions.edit'
        );

        $content = trim($content);
        if(strlen($content) > $this->settings->get('pushedx-chat.charlimit')) return null;

        $message = $this->messages->findOrFail($messageid);
        $this->assertPermission($actor->id == $message->actorId);

        $message->message = $content;
        $message->edited_at = Carbon::now();

        $message->save();

        $msg = [
            'id' => $message->id,
            'actorId' => $actor->id,
            'message' => $content
        ];
        $this->pusher->trigger('public', 'eventEdit', $msg);

        return $content;
    }
}
