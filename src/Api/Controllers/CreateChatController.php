<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Api\Event\WillSerializeData as EventWillSerializeData;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

use Xelson\Chat\Api\Serializers\ChatSerializer;
use Xelson\Chat\Commands\CreateChat;
use Xelson\Chat\ChatSocket;

class ListChatsController extends AbstractCreateController 
{
    /**
     * The serializer instance for this request.
     *
     * @var ChatSerializer
     */
	public $serializer = ChatSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = ['creator', 'users'];

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher            $bus
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
		$data = Arr::get($request->getParsedBody(), 'data', []);
		
        $this->getEventDispatcher()->listen(EventWillSerializeData::class, [$this, 'onWillSerializeData']);

        return $this->bus->dispatch(
            new CreateChat($actor, $data)
        );
	}
	
    public function onWillSerializeData(EventWillSerializeData $event)
    {
        $request = $event->request;
        $data = $event->data;
        $document = $event->document;
        $serializer = AbstractCreateController::getContainer()->make($this->serializer);
        $serializer->setRequest($request);

        $element = $this->createElement($data, $serializer)
            ->with($this->extractInclude($request))
            ->fields($this->extractFields($request));

        $response = $document->setData($element)->jsonSerialize();

        $chat = $data;
        $this->socket->sendChatEvent($chat->id, 'chat.create', [
            'chat' => $response
        ]);
    }
}