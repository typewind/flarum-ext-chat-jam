import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';

import ChatSearchUser from './ChatSearchUser';


export default class ChatCreateModal extends Modal
{
	init()
	{
		this.selectedUsers = []

	}

	className() {
		return 'Modal--small';
	}

	title() {
		return app.translator.trans('pushedx-chat.forum.chat.list.preview.add_modal.title');
	}

	userSelected(user, isSelected)
	{
		if(!isSelected) this.selectedUsers.push(user);
		else this.selectedUsers = this.selectedUsers.filter(u => u.id() != user.id()); 

		return !isSelected;
	}

	content() {
		return (
			<div className="Modal-body Modal-body--neonchat">
				<div className="UsersTags">
					{this.selectedUsers.map(u => <div className='UserMention'>{'@' + u.displayName()}</div>)}
				</div>
				<div className="UsersSearch">
					<ChatSearchUser state={app.search} callback={this.userSelected.bind(this)}/>
				</div>             
				<Button className="Button Button--primary Button--block ButtonCreate" onclick={this.hide.bind(this)}>
                	{app.translator.trans('pushedx-chat.forum.chat.list.preview.add_modal.create')}
              	</Button>
			</div>
		);
	}
}