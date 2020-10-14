import humanTime from 'flarum/utils/humanTime';
import fullTime from 'flarum/helpers/fullTime';
import Component from 'flarum/Component';

export default class ChatPreview extends Component
{
	init()
	{
		this.model = this.props.model;
		this.attrs = Object.assign(this.model.data.attributes, this.props);

		this.attrs.textColor = this.pickTextColorBasedOnBgColorSimple(this.attrs.color, '#FFF', '#000');

		let users = this.model.users();
		if(app.session.user && this.attrs.type == 0 && users.length && users.length < 3)
		{
			for(const user of users)
			{
				if(user && user.id() != app.session.user.id())
				{
					this.attrs.title = user.displayName();
					this.attrs.avatarUrl = user.avatarUrl();
					this.attrs.color = user.color();

					break;
				}
			}
		}
	}

	view()
	{
		return (
			<div className={'panel-preview ' + (this.attrs.active ? 'active' : '')}>
				{this.componentPreview()}
			</div>
		)
	}

	componentMessageTime()
	{
		let time = new Date(this.model.last_message().created_at());
		if(Date.now() - time.getTime() < 60 * 60 * 12 * 1000)
			return time.toLocaleTimeString().slice(0, 5);
		
		return humanTime(this.model.last_message().created_at());
	}

	componentAvatarPM()
	{
		return (
			<div 
				className={'avatar ' + (this.attrs.avatarUrl ? 'image' : '')} 
				style={{'background-color': this.attrs.color, color: this.attrs.textColor, 'background-image': this.attrs.avatarUrl ? `url(${this.attrs.avatarUrl})` : null}}
			>
				{this.attrs.avatarUrl ? null : this.firstLetter(this.attrs.title).toUpperCase()}
			</div>
		)
	}

	componentAvatarChannel()
	{
		return (
			<div 
				className='avatar'
				style={{'background-color': this.attrs.color, color: this.attrs.textColor}}
			>
				{this.attrs.avatarUrl ? null : this.firstLetter(this.attrs.title).toUpperCase()}
			</div>
		)
	}

	componentPreview()
	{
		return ([
			this.attrs.type ? this.componentAvatarChannel() : this.componentAvatarPM(),
			<div style="display: flex; flex-direction: column">
				<div className='title' title={this.attrs.title}>{this.attrs.title}</div>
				{this.model.last_message() ? this.componentTextPreview() : this.componentTextEmpty()}
			</div>,
			this.model.last_message() ? 
				<div className='timestamp' title={fullTime(this.model.last_message().created_at()).children[0]}>{this.humanTime = this.componentMessageTime()}</div>
				: null
		])
	}

	componentPreviewChannel()
	{
		return ([
			<div 
				className='avatar'
				style={{'background-color': this.attrs.color, color: this.attrs.textColor}}
			>
				{this.attrs.avatarUrl ? null : this.firstLetter(this.attrs.title).toUpperCase()}
			</div>,
			<div style="display: flex; flex-direction: column">
				<div className='title' title={this.attrs.title}>{this.attrs.title}</div>
				{this.componentTextPreview()}
			</div>,
			<div className='timestamp' title={fullTime(this.model.last_message().created_at()).children[0]}>{this.humanTime = this.componentMessageTime()}</div>
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
		let formatResult = this.formatTextPreview(this.model.last_message().message());
		let senderName, users = this.model.users(), sender = this.model.last_message().user();
		if(app.session.user)
		{
			if(app.session.user.id() == sender.id()) senderName = 'You: '
			else if(users.length > 2 || this.attrs.type) 
				senderName = sender.displayName() + ': ';
		}

		return (
			<div className='message'>
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