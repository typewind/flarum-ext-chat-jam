import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import fullTime from 'flarum/helpers/fullTime';
import classList from 'flarum/utils/classList';
import humanTime from 'flarum/utils/humanTime';
import extractText from 'flarum/utils/extractText';
import ItemList from 'flarum/utils/ItemList';

import Dropdown from 'flarum/components/Dropdown';
import Button from 'flarum/components/Button';
import Separator from 'flarum/components/Separator';
import Link from 'flarum/components/Link';

import ChatState from '../states/ChatState';

export default class ChatMessage extends Component
{
	oninit(vnode)
	{
		super.oninit(vnode);

		this.labels = [];
		this.model = this.attrs.model;
		if(!this.model.content) this.model.content = this.model.message();

		this.initLabels();
	}

	modelEvent(name, ...args)
	{
		ChatState.evented.trigger('onClickMessage', name, this.model, args)
	}

	view(vnode)
	{
		return (
			<div 
				className={classList({
					'message-wrapper': true, 
					hidden: this.model.deleted_by(), 
					editing: this.model.is_editing, 
					deleted: !this.isVisible()}
					)}
				data-id={this.model.id()}>
				<div>
					{this.model.user() ? 
						<Link className='avatar-wrapper' href={app.route.user(this.model.user())}>
							<span>{avatar(this.model.user(), {className: 'avatar'})}</span>
						</Link>
						:
						<div className='avatar-wrapper'>
							<span>{avatar(this.model.user(), {className: 'avatar'})}</span>
						</div>
					}
					<div className='message-block'>
						<div className='toolbar'>
							<a className='name' onclick={this.modelEvent.bind(this, 'insertMention')}>
								{extractText(username(this.model.user())) + ': '}
							</a>
							<div className='labels'>
								{this.labels.map(label => label.condition() ? label.component() : null)}
							</div>
							<div className='right'>
								{this.model.id() ? [
									this.model.deleted_forever ? null : this.editDropDown(),
									<a className='timestamp' title={extractText(fullTime(this.model.created_at()))}>{this.humanTime = humanTime(this.model.created_at())}</a>
								] 
								: this.model.timedOut ? this.editDropDownTimedOut() : null}
							</div>
						</div>
						<div className='message'>
							{this.model.is_censored() ?
								<div className='censored' title={app.translator.trans('pushedx-chat.forum.chat.message.censored')}>
									{this.model.content}
								</div> : <div oncreate={this.onContentWrapperCreated.bind(this)} onupdate={this.onContentWrapperUpdated.bind(this)}></div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}

	initLabels()
	{
		this.labelBind(
			() => this.model.edited_at(), 
			() => (
				<div class='icon' title={extractText(app.translator.trans(
					'core.forum.post.edited_tooltip',
					{user: this.model.user(), ago: humanTime(this.model.edited_at())}
				))}>
					<i class="fas fa-pencil-alt"></i>
				</div>
			)
		);

		this.labelBind(
			() => this.model.deleted_by(), 
			() => (
				<div class='icon'>
					<i class="fas fa-trash-alt"></i> <span>
						{`(${app.translator.trans('pushedx-chat.forum.chat.message.deleted' + (this.model.deleted_forever ? '_forever' : ''))}`} {username(this.model.deleted_by())})
					</span>
				</div>
			)
		);

		this.labelBind(
			() => this.model.timedOut, 
			() => (
				<div class='icon' style='color: #ff4063'>
					<i class="fas fa-exclamation-circle"></i>
				</div>
			)
		);
	}

	labelBind(condition, component)
	{
		this.labels.push({condition: condition, component: component})
	}

	editDropDown()
	{
		const items = new ItemList()

		if(ChatState.getPermissions().edit && this.model.user() && this.model.user() == app.session.user)
		{
			items.add('dropdownEditStart',
				<Button 
					onclick={this.modelEvent.bind(this, 'dropdownEditStart')} 
					icon='fas fa-pencil-alt'
					disabled={this.model.deleted_by() || this.model.is_editing}
				>
					{app.translator.trans('core.forum.post_controls.edit_button')}
				</Button>
			);
		}

		items.add('separator', <Separator />);

		if(ChatState.getPermissions().moderate.delete || (ChatState.getPermissions().delete && this.model.user() == app.session.user))
		{
			if(this.model.deleted_by())
			{
				items.add('dropdownRestore',
					<Button
						onclick={this.modelEvent.bind(this, 'dropdownRestore')} 
						icon='fas fa-reply'
						disabled={!ChatState.getPermissions().moderate.delete && this.model.deleted_by() != app.session.user}
					>
						{app.translator.trans('core.forum.post_controls.restore_button')}
					</Button>
				);

			}
			else
			{
				items.add('dropdownHide',
					<Button
						onclick={this.modelEvent.bind(this, 'dropdownHide')} 
						icon='fas fa-trash-alt'
						disabled={this.model.is_editing}
					>
						{app.translator.trans('core.forum.post_controls.delete_button')}
					</Button>
				);
			}
		}

		if(ChatState.getPermissions().moderate.delete && (this.model.deleted_by() || ChatState.totalHidden() >= 3))
		{
			items.add('dropdownDelete',
				<Button 
					onclick={this.modelEvent.bind(this, 'dropdownDelete')} 
					icon='fas fa-trash-alt'
					disabled={!ChatState.getPermissions().delete}
				>
					{app.translator.trans('core.forum.post_controls.delete_forever_button')}
				</Button>
			)
		}

		return Object.keys(items.items).length <= 1 ? null : (
			<div className='edit'>
				<Dropdown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					{items.toArray()}
				</Dropdown>
			</div>
		)
	}
	
	editDropDownTimedOut()
	{
		return (
			<div className='edit'>
				<Dropdown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					<Button 
						onclick={this.modelEvent.bind(this, 'dropdownDelete')} 
						icon='fas fa-trash-alt'
					>
						{app.translator.trans('pushedx-chat.forum.chat.message.actions.hide')}
					</Button>
					<Button 
						onclick={this.modelEvent.bind(this, 'dropdownResend')}
						icon='fas fa-reply'
					>
						{app.translator.trans('pushedx-chat.forum.chat.message.actions.resend')}
					</Button>
				</Dropdown>
			</div>
		)
	}

	oncreate(vnode)
	{
		super.oncreate(vnode);
		this.messageWrapper = vnode.dom;
	}

	onContentWrapperUpdated(vnode)
	{
		this.renderMessage(vnode)
	}

	onContentWrapperCreated(vnode)
	{
		this.renderMessage(vnode)
	}

	renderMessage(vnode)
	{
		let element = vnode.dom;

		if(this.model.needToFlash) 
		{
			this.flashItem($(this.messageWrapper));
			this.model.needToFlash = false;
		}
		if(this.model.content !== this.oldContent)
		{
			this.oldContent = this.model.content;
			ChatState.renderChatMessage(element, this.model.content);
		}
	}

	isVisible()
	{
		if(this.model.chat() != ChatState.getCurrentChat())
			return false;

		if(this.model.deleted_forever && (!ChatState.getPermissions().moderate.vision || !this.model.id()))
			return false;

		if(this.model.deleted_by() && !(ChatState.getPermissions().moderate.vision || this.model.user() == app.session.user))
			return false;

		return true;
	}

	/**
	 * https://github.com/flarum/core/blob/7e74f5a03c7f206014f3f091968625fc0bf29094/js/src/forum/components/PostStream.js#L579
	 * 
	 * 'Flash' the given post, drawing the user's attention to it.
	 *
	 * @param {jQuery} $item
	 */
	flashItem($item) {
		$item.addClass('flash').one('animationend webkitAnimationEnd', () => $item.removeClass('flash'));
	}
}