<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Xelson\Chat\MessageRepository;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Events\Dispatcher;

class FetchChatHandler
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var MessageRepository
     */
    protected $messages;

    /**
     * @param Dispatcher                    $events
     * @param Application                   $app
     * @param SettingsRepositoryInterface   $settings
     * @param MessageRepository             $messages
     */
    public function __construct(
        Dispatcher $events,
        Application $app,
        SettingsRepositoryInterface $settings,
        MessageRepository $messages
    ) {
        $this->events    = $events;
        $this->app       = $app;
        $this->settings  = $settings;
        $this->messages  = $messages;
    }

    /**
     * Handles the command execution.
     *
     * @return null|string
     *
     */
    public function handle(FetchChat $command)
    {
        $messageId = $command->id;
        $messages = $this->messages->fetch($messageId);
        $command->messages = $messages;

        return $command;
    }
}
