import humanTime from 'flarum/utils/humanTime';
import Component from 'flarum/Component';
import classList from 'flarum/utils/classList';
import extractText from 'flarum/utils/extractText';

import ChatState from '../states/ChatState';

export default class ChatPreview extends Component
{
	oninit(vnode)
	{
		super.oninit(vnode);
		
		this.model = this.attrs.model;

		this.model.finalTitle = this.model.title();
		this.model.finalColor = this.model.color()
		this.model.textColor = this.pickTextColorBasedOnBgColorSimple(this.model.finalColor, '#FFF', '#000');

		let users = this.model.users();
		if(app.session.user && this.model.type() == 0 && users.length && users.length < 3)
		{
			for(const user of users)
			{
				if(user && user.id() != app.session.user.id())
				{
					this.model.finalTitle = user.displayName();
					this.model.finalColor = user.color();
					this.model.avatarUrl = user.avatarUrl();

					break;
				}
			}
		}
	}

	view(vnode)
	{
		return (
			<div className={classList({'panel-preview' : true, 'active': ChatState.getCurrentChat() == this.model})}>
				{this.componentPreview()}
			</div>
		)
	}

	componentMessageTime()
	{
		let lastMessage = this.model.last_message();
		let time = new Date(lastMessage.created_at());
		if(Date.now() - time.getTime() < 60 * 60 * 12 * 1000)
			return time.toLocaleTimeString().slice(0, 5);
		
		return humanTime(lastMessage.created_at());
	}

	componentAvatarPM()
	{
		return (
			<div 
				className={'avatar ' + (this.model.avatarUrl ? 'image' : '')} 
				style={{'background-color': this.model.finalColor, color: this.model.textColor, 'background-image': this.model.avatarUrl ? `url(${this.model.avatarUrl})` : null}}
			>
				{this.model.avatarUrl ? null : this.firstLetter(this.model.finalTitle).toUpperCase()}
			</div>
		)
	}

	componentAvatarChannel()
	{
		return (
			<div 
				className='avatar'
				style={{'background-color': this.model.finalColor, color: this.model.textColor}}
			>
				{this.model.avatarUrl ? null : this.firstLetter(this.model.finalTitle).toUpperCase()}
			</div>
		)
	}

	componentPreview()
	{
		return ([
			this.model.type() ? this.componentAvatarChannel() : this.componentAvatarPM(),
			<div style="display: flex; flex-direction: column">
				<div className='title' title={this.model.finalTitle}>{this.model.finalTitle}</div>
				{this.model.last_message() ? this.componentTextPreview() : this.componentTextEmpty()}
			</div>,
			this.model.last_message() ? 
				<div className='timestamp' title={extractText(this.model.last_message().created_at())}>{this.humanTime = this.componentMessageTime()}</div>
				: null
		])
	}

	componentPreviewChannel()
	{
		return ([
			<div 
				className='avatar'
				style={{'background-color': this.model.finalColor, color: this.model.textColor}}
			>
				{this.model.avatarUrl ? null : this.firstLetter(this.model.finalTitle).toUpperCase()}
			</div>,
			<div style="display: flex; flex-direction: column">
				<div className='title' title={this.model.finalTitle}>{this.model.finalTitle}</div>
				{this.componentTextPreview()}
			</div>,
			<div className='timestamp' title={extractText(this.model.last_message().created_at())}>{this.humanTime = this.componentMessageTime()}</div>
		])
	}

	formatTextPreview(text)
	{
		let type;
		if(text.startsWith('```'))
		{
			text = '<Code/>';
			type = 'media';
		}
		else if(text.startsWith('http://') || text.startsWith('https://'))
		{
			text = 'URL';
			type = 'media';
		}
		return {text, type};
	}

	componentTextPreview()
	{
		let lastMessage = this.model.last_message();
		let formatResult = this.formatTextPreview(lastMessage.message());
		let senderName, users = this.model.users(), sender = lastMessage.user();
		if(app.session.user)
		{
			if(app.session.user.id() == sender.id()) senderName = 'You: '
			else if(users.length > 2 || this.model.type()) 
				senderName = sender.displayName() + ': ';
		}

		return (
			<div className={classList({message: true, censored: lastMessage.is_censored()})}
				title={lastMessage.is_censored() ? app.translator.trans('pushedx-chat.forum.chat.message.censored') : null}>
				<span className='sender'>{senderName}</span>
				<span className={formatResult.type}>{formatResult.text}</span>
			</div>
		)
	}

	componentTextEmpty()
	{
		return (
			<div className='message'>
				<span className='empty'>{app.translator.trans('pushedx-chat.forum.chat.list.preview.empty')}</span>
			</div>
		)
	}

	pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) 
	{
		var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
		var r = parseInt(color.substring(0, 2), 16);
		var g = parseInt(color.substring(2, 4), 16);
		var b = parseInt(color.substring(4, 6), 16);
		return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColor : lightColor;
	}

	firstLetter(string)
	{
		for(let i = 0; i < string.length; i++)
		{
			if(this.isLetter(string[i]))
				return string[i];
		}
		return string[0];
	}

	isLetter(c) 
	{
		return c.toLowerCase() != c.toUpperCase();
	}
}