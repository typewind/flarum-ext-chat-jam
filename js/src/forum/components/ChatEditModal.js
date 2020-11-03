import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import classList from 'flarum/utils/classList';

import ChatModal from './ChatModal';
import Stream from 'flarum/utils/Stream';

export default class ChatEditModal extends ChatModal
{
	oninit(vnode)
	{
		super.oninit(vnode);

		this.getInput().title = Stream(this.model.title());
		this.getInput().color = Stream(this.model.color());
		this.getInput().icon = Stream(this.model.icon());

		this.setSelectedUsers(this.model.users());
		this.edited = {};
	}

	title() 
	{
		return app.translator.trans('pushedx-chat.forum.chat.edit_modal.title');
	}

	onsubmit()
	{
		let added = this.getSelectedUsers().map(mdl => !this.model.users().includes(mdl) ? mdl : null).filter(e => e);
		let removed = this.model.users().map(mdl => !this.getSelectedUsers().includes(mdl) ? mdl : null).filter(e => e);
		let edited = Object.keys(this.edited).map(k => this.edited[k] = {id: k, ...this.edited[k]});

		this.model.save({
			title: this.getInput().title(),
			color: this.getInput().color(),
			icon: this.getInput().icon(),
			users: {added, removed, edited},
			relationships: {users: this.getSelectedUsers()}
		});

		this.hide();
	}

	alertText()
	{
		return null;
	}

	isModer(user)
	{
		return this.edited[user.id()]?.role ?? user.chat_pivot(this.model.id()).role() == 1;
	}

	isCreator(user)
	{
		return user.chat_pivot(this.model.id()).role() == 2;
	}

	userMentionClassname(user)
	{
		return classList({editable: true, moder: this.isModer(user), creator: this.isCreator(user)});
	}

	userMentionDropdownOnclick(user, button)
	{
		switch(button)
		{
			case 'moder':
			{
				if(this.isModer(user)) this.edited[user.id()] = {role: 0};
				else this.edited[user.id()] = {role: 1};

				break;
			}
			case 'kick':
			{
				this.getSelectedUsers().splice(this.getSelectedUsers().indexOf(user), 1);
				break;
			}
		}
	}

	userMentionContent(user)
	{
		return [
			'@' + user.displayName(),
			<Dropdown 
				buttonClassName="Button Button--icon Button--flat Button--mention-edit"
				menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
				icon="fas fa-chevron-down"
			>
				<Button 
					icon={this.isModer(user) ? 'fas fa-times' : 'fas fa-users-cog'}
					onclick={this.userMentionDropdownOnclick.bind(this, user, 'moder')}
					disabled={user == app.session.user}
				>
					{app.translator.trans('pushedx-chat.forum.chat.moder')}
				</Button>
				<Button 
					icon='fas fa-trash-alt'
					onclick={this.userMentionDropdownOnclick.bind(this, user, 'kick')}
				>
					{app.translator.trans('pushedx-chat.forum.chat.kick')}
				</Button>
			</Dropdown>
		];
	}

	userMentionOnClick(user, e)
	{
		this.$(e.target).find('.Dropdown').trigger('shown.bs.dropdown');
	}

	componentFormInputIcon()
	{
		return this.componentFormIcon({
			title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.icon'),
			desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.icon.validator', {a: <a href="https://fontawesome.com/icons?m=free" tabindex="-1" />}),
			stream: this.getInput().icon,
			placeholder: 'fas fa-bolt'
		});
	}

	componentFormInputTitle()
	{
		return this.componentFormInput({
			title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title'),
			desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title.validator'),
			stream: this.getInput().title,
			placeholder: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.title')
		});
	}

	componentFormInputColor()
	{
		return this.componentFormColor({
			title: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color'),
			desc: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color.validator'),
			stream: this.getInput().color,
			placeholder: app.translator.trans('pushedx-chat.forum.chat.edit_modal.form.color')
		});
	}

	componentFormPM()
	{
		return [

		];
	}

	componentFormChannel()
	{
		return [
			this.componentFormInputTitle(),
			this.componentFormInputColor(),
			this.componentFormInputIcon(),
			this.componentFormUsersSelect('pushedx-chat.forum.chat.edit_modal.form.users.edit')
		];
	}

	componentFormChat()
	{
		return [
			this.componentFormInputTitle(),
			this.componentFormInputColor(),
			this.componentFormInputIcon(),
			this.componentFormUsersSelect()
		];
	}

	componentForm()
	{
		if(this.model.type()) return this.componentFormChannel();
		if(this.model.users().length == 2) return this.componentFormPM();
		
		return this.componentFormChat();
	}

	isCanEditChannel()
	{
		return this.getInput().title().length;
	}

	isCanEditChat()
	{
		if(this.alertText()) return false;

		return true;
	}

	content() {
		return (
			<div className="Modal-body Modal-body--neonchat">
				<div class="Form-group InputTitle">
					{this.componentForm()}
					<Button
						className='Button Button--primary Button--block ButtonCreate'
						onclick={this.onsubmit.bind(this)}
						disabled={this.model.type() ? !this.isCanEditChannel() : !this.isCanEditChat()}
					>
						{app.translator.trans('pushedx-chat.forum.chat.edit_modal.save_button')}
					</Button>
				</div>
			</div>
		);
	}
}