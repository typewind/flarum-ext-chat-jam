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
use DateTime;

class DeleteChatHandler
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
     * @param DeleteChat $command
     * @return null|string
     */
    public function handle(DeleteChat $command)
    {
        $messageId = $command->id;
        $actor = $command->actor;

        $this->assertCan(
            $actor,
            'pushedx-chat.permissions.delete'
        );

		$message = $this->messages->findOrFail($messageId);
		
		if($message->deleted_by)
		{
			if($message->deleted_by != $actor->id)
			{
				$this->assertCan(
					$actor,
					'pushedx-chat.permissions.moderate.delete'
				);
			}	
			$message->deleted_by = null;
		}
		else 
		{
			if($message->actorId != $actor->id)
			{
				$this->assertCan(
					$actor,
					'pushedx-chat.permissions.moderate.delete'
				);
			}	
			$message->deleted_by = $actor->id;
		}
        
        $message->save();

        $messageData = $message->toArray();
        $messageData['created_at'] = (new Carbon($message->created_at))->format(DateTime::RFC3339);
        if($messageData['edited_at']) $messageData['edited_at'] = (new Carbon($message->edited_at))->format(DateTime::RFC3339);

        $msg = [
            'message' => $messageData,
            'restored' => !$message->deleted_by,
            'actor' => $actor->id
        ];
        $this->pusher->trigger('public', 'eventDelete', $msg);

        return $message->deleted_by;
    }
}
