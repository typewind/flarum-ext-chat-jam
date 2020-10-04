import Store from 'flarum/Store';
import User from 'flarum/models/User';
import Chat from './models/Chat';
import Message from './models/Message';

/**
 * The `store` initializer creates the application's data store and registers
 * the default resource types to their models.
 *
 * @param {App} app
 */
export default function createStore(app) {
	app.store = new Store({
		users: User,
		chats: Chat,
		chatmessages: Message,
	});
}