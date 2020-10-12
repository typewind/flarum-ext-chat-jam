<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Controllers;

use Xelson\Chat\Api\Serializers\MessageSerializer;
use Xelson\Chat\Commands\DeleteMessage;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

use Flarum\Api\Event\WillSerializeData as EventWillSerializeData;
use Xelson\Chat\ChatSocket;

class DeleteMessageController extends AbstractShowController
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
    public $include = ['user', 'deleted_by', 'chat'];

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus, ChatSocket $socket)
    {
        $this->bus = $bus;
        $this->socket = $socket;
    }
    /**
     * @param ServerRequestInterface $request
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');

        $this->getEventDispatcher()->listen(EventWillSerializeData::class, [$this, 'onWillSerializeData']);

        return $this->bus->dispatch(
            new DeleteMessage($id, $actor)
        );
    }

    public function onWillSerializeData(EventWillSerializeData $event)
    {
        $request = $event->request;
        $data = $event->data;
        $document = $event->document;
        $serializer = AbstractShowController::getContainer()->make($this->serializer);
        $serializer->setRequest($request);

        $element = $this->createElement($data, $serializer)
            ->with($this->extractInclude($request))
            ->fields($this->extractFields($request));

        $response = $document->setData($element)->jsonSerialize();

        $message = $data;
        $this->socket->sendChatEvent($message->chat_id, $message->event, [
            'message' => $response
        ]);
    }
}
