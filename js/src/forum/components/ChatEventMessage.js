import ChatMessage from './ChatMessage';
import Link from 'flarum/components/Link';
import extractText from 'flarum/utils/extractText';
import humanTime from 'flarum/utils/humanTime';
import fullTime from 'flarum/helpers/fullTime';

export default class ChatEventMessage extends ChatMessage
{
	oninit(vnode)
	{
		super.oninit(vnode);

		this.parsedContent = JSON.parse(this.model.message());
	}

	componentUserMention(user)
	{
		return (
			<Link href={app.route.user(user)}>
				<span className='UserMention'>{user.displayName()}</span>
			</Link>
		);
	}

	componentEventText()
	{
		switch(this.parsedContent.id)
		{
			case 'chatCreated':
			{
				return app.translator.trans('pushedx-chat.forum.chat.message.events.chat.created', {
					creatorname: this.componentUserMention(this.model.chat().creator()), 
					chatname: <b>{this.model.chat().title()}</b>,
					usernames: this.parsedContent.users.map(user_id => this.componentUserMention(app.store.getById('users', user_id))) 
				})
			}
		}
	}

	content()
	{
		return (
			<div className='event'>
				{this.componentEventText()}
				<a className='timestamp' title={extractText(fullTime(this.model.created_at()))}>{this.humanTime = humanTime(this.model.created_at())}</a>
			</div>
		);
	}
}