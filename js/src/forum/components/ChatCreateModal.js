import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import classList from 'flarum/utils/classList';

import ChatSearchUser from './ChatSearchUser';

export default class ChatCreateModal extends Modal
{
	init()
	{
		this.selectedUsers = [];
		this.input = {text: m.prop('')};
		this.isChannel = false;

		app.search.neonchat = {modalInited: true};
	}

	className() {
		return 'Modal--small';
	}

	title() {
		return app.translator.trans('pushedx-chat.forum.chat.list.add_modal.title');
	}

	userSelected(user, isSelected)
	{
		if(!isSelected) this.selectedUsers.push(user);
		else this.selectedUsers = this.selectedUsers.filter(u => u.id() != user.id()); 

		return !isSelected;
	}

	isCanCreateChat()
	{
		if(this.selectedUsers.length > 1 && !this.input.text().length) return false;
		if(!this.selectedUsers.length) return false;
		return true;
	}

	isCanCreateChannel()
	{
		return this.input.text().length;
	}

	onsubmit()
	{


		this.hide();
	}

	componentFormChat()
	{
		return [
			this.selectedUsers.length > 1 ? [
			<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.chat')}</label>,
			<div>
				<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.validator')}</label>
				<input class="FormControl" type="text" bidi={this.input.text} 
					placeholder={app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.chat')} />
			</div>
			] : null,
			<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.users')}</label>,
			<div className="UsersTags">
				{this.selectedUsers.map(u => <div className='UserMention'>{'@' + u.displayName()}</div>)}
			</div>,
			<div className="UsersSearch">
				<ChatSearchUser store={app.search.neonchat} callback={this.userSelected.bind(this)}/>
			</div>,    
			<Button 
				className='Button Button--primary Button--block ButtonCreate'
				disabled={!this.isCanCreateChat()}
				onclick={this.onsubmit.bind(this)}
			>
				{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.create.chat')}
			</Button>
		]
	}

	componentFormChannel()
	{
		return [
			<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.channel')}</label>,
			<div>
				<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.validator')}</label>
				<input class="FormControl" type="text" bidi={this.input.text} 
					placeholder={app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.channel')} />
			</div>,  
			<Button 
				className='Button Button--primary Button--block ButtonCreate'
				disabled={!this.isCanCreateChannel()}
				onclick={this.onsubmit.bind(this)}
			>
				{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.create.channel')}
			</Button>
		]
	}

	content() {
		return (
			<div className="Modal-body Modal-body--neonchat">
				<div class="Form-group InputTitle">
					<div className="ChatType">
						<div className={classList({'Tab Tab--left': true, 'Tab--active': !this.isChannel})}
							onclick={(() => this.isChannel = false).bind(this)}
						>
							{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.chat')}
						</div>
						<div className={classList({'Tab Tab--right': true, 'Tab--active': this.isChannel})}
							onclick={(() => this.isChannel = true).bind(this)}
						>
							{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.channel')}
						</div>
					</div>
					{this.isChannel ? this.componentFormChannel() : this.componentFormChat()}
				</div>
			</div>
		);
	}
}