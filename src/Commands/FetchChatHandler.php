<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Flarum\User\AssertPermissionTrait;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Events\Dispatcher;

class FetchChatHandler
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
     * @return null|string
     *
     */
    public function handle(FetchChat $command)
    {
        return $command;
    }
}
