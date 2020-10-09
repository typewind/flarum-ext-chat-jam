<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Controllers;

use Xelson\Chat\Api\Serializers\MessageSerializer;
use Xelson\Chat\Commands\PostMessage;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class PostMessageController extends AbstractShowController
{

    /**
     * The serializer instance for this request.
     *
     * @var MessageSerializer
     */
    public $serializer = MessageSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * {@inheritdoc}
     */
    public $include = ['user', 'deleted_by'];

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }
    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document               $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $msg = array_get($request->getParsedBody(), 'msg');
        $chat_id = array_get($request->getParsedBody(), 'chat_id');
        $ip_address = Arr::get($request->getServerParams(), 'REMOTE_ADDR', '127.0.0.1');

        return $this->bus->dispatch(
            new PostMessage($msg, $actor, $chat_id, $ip_address)
        );
    }
}
