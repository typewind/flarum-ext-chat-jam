import Modal from 'flarum/components/Modal';
import ChatSearchUser from './ChatSearchUser';
import Stream from 'flarum/utils/Stream';
import ItemList from 'flarum/utils/ItemList';

import ChatState from '../states/ChatState';

export default class ChatModal extends Modal
{
	oninit(vnode)
	{
		super.oninit(vnode);

		this.model = this.attrs.model;

		app.search.neonchat = {usersSelected: []};
		this.usersSelected = app.search.neonchat.usersSelected;

		this.input = {
			title: Stream(''), 
			color: Stream(''),
			icon: Stream(''),
		};
	}

	onremove(vnode)
	{
		app.search.neonchat = null;
	}

	getInput()
	{
		return this.input;
	}

	setSelectedUsers(users)
	{
		app.search.neonchat.usersSelected = users;
		this.usersSelected = app.search.neonchat.usersSelected;
	}

	getSelectedUsers()
	{
		return this.usersSelected;
	}

	className() 
	{
		return 'Modal--small';
	}

	isChatExists()
	{
		return this.getSelectedUsers().length == 1 && ChatState.isExistsPMChat(app.session.user, this.getSelectedUsers()[0]);
	}

	isCanCreateChat()
	{
		if(this.getSelectedUsers().length > 1 && !this.input.title().length) return false;
		if(!this.getSelectedUsers().length) return false;
		if(this.alertText()) return false;

		return true;
	}

	isCanCreateChannel()
	{
		return this.input.title().length;
	}

	alertText()
	{
		if(this.isChatExists()) return app.translator.trans('pushedx-chat.forum.chat.list.add_modal.alerts.exists');

		return null;
	}

	componentAlert()
	{
		return !this.alertText() ? null : (
			<div className="Alert">
				{this.alertText()}
			</div>
		);
	}

	componentFormUsersSelect()
	{
		return [
			<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.users')}</label>,
			this.componentUsersSelect()
		];
	}

	componentUsersSelect()
	{
		return [
			this.componentAlert(),
			<div className="UsersTags">
				{this.getSelectedUsers().map(u => 
					<div 
						className='UserMention deleteable' 
						onclick={() => this.getSelectedUsers().splice(this.getSelectedUsers().indexOf(u), 1)}
					>
						{'@' + u.displayName()}
					</div>
				)}
			</div>,
			<div className="UsersSearch">
				<ChatSearchUser state={app.search} />
			</div>
		]
	}

	componentFormIcon(options)
	{
		return [
			options.title ? <label>{options.title}</label> : null,
			<div>
				{options.desc ? <label>{options.desc}</label> : null}
				<div className='Icon-Input'>
					<input 
						class="FormControl" 
						type="text" 
						bidi={options.stream} 
						placeholder={options.placeholder}
						onupdate={vnode => $('.Chat-FullColor').css({color: this.input.color(), backgroundColor: this.input.color()})}
					/>
					<icon className='Chat-FullColor'>
						<i className={this.input.icon()} />
					</icon>
				</div>
			</div>
		];
	}

	componentFormColor(options)
	{
		return [
			options.title ? <label>{options.title}</label> : null,
			<div>
				{options.desc ? <label>{options.desc}</label> : null}
				<div className='Color-Input'>
					<input 
						class="FormControl" 
						type="text" 
						bidi={options.stream} 
						placeholder={options.placeholder}
						onupdate={vnode => $('.Chat-FullColor').css({color: this.input.color(), backgroundColor: this.input.color()})}
					/>
					<color className='Chat-FullColor'/>
				</div>
			</div>
		];
	}

	componentFormInput(options)
	{
		return [
			options.title ? <label>{options.title}</label> : null,
			<div>
				{options.desc ? <label>{options.desc}</label> : null}
				<input 
					class="FormControl" 
					type="text" 
					bidi={options.stream} 
					placeholder={options.placeholder} 
				/>
			</div>
		];
	}
}