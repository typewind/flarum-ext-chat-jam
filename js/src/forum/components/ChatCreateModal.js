import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import ChatSearchUser from './ChatSearchUser';

export default class ChatCreateModal extends Modal
{
	init()
	{
		this.selectedUsers = [];
		this.input = {text: m.prop('')};
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

	isCanCreate()
	{
		if(this.selectedUsers.length > 1 && !this.input.text().length) return false;
		if(!this.selectedUsers.length) return false;
		return true;
	}

	onsubmit()
	{


		this.hide();
	}

	content() {
		return (
			<div className="Modal-body Modal-body--neonchat">
				<div class="Form-group InputTitle">
					{this.selectedUsers.length > 1 ? [
					<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title')}</label>,
					<div>
						<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.title.validator')}</label>
						<input class="FormControl" type="text" bidi={this.input.text} placeholder='Название беседы' />
					</div>
					] : null}
					<label>{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.form.users')}</label>
					<div className="UsersTags">
						{this.selectedUsers.map(u => <div className='UserMention'>{'@' + u.displayName()}</div>)}
					</div> 
				</div>
				<div className="UsersSearch">
					<ChatSearchUser state={app.search} callback={this.userSelected.bind(this)}/>
				</div>    
				<Button 
					className='Button Button--primary Button--block ButtonCreate'
					disabled={!this.isCanCreate()}
					onclick={this.onsubmit.bind(this)}
				>
                	{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.create')}
              	</Button>
			</div>
		);
	}
}