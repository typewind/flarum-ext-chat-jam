import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import fullTime from 'flarum/helpers/fullTime';
import classList from 'flarum/utils/classList';
import humanTime from 'flarum/utils/humanTime';
import extractText from 'flarum/utils/extractText';

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
		
		this.message = this.model.message();
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
				data-id={this.model.id()} 
				key={this.model.id()} 
				onupdate={this.configWrapper.bind(this)}>
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
									this.deleted_forever ? null : this.editDropDown(),
									<a className='timestamp' title={extractText(fullTime(this.model.created_at()))}>{this.humanTime = humanTime(this.model.created_at())}</a>
								] 
								: this.model.timedOut ? this.editDropDownTimedOut() : null}
							</div>
						</div>
						<div className='message'>
							{this.model.is_censored() ?
								<div className='censored' title={app.translator.trans('pushedx-chat.forum.chat.message.censored')}>
									{this.message}
								</div> : <div oncreate={this.configFormat.bind(this)} onupdate={this.configFormat.bind(this)}></div>
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
						{`(${app.translator.trans('pushedx-chat.forum.chat.message.deleted' + (this.deleted_forever ? '_forever' : ''))}`} {username(this.model.deleted_by())})
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
		return (
			<div className='edit'>
				<Dropdown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					{this.model.user() && app.session.user && this.model.user().id() == app.session.user.id() ?
						[<Button 
							onclick={this.modelEvent.bind(this, 'dropdownEditStart')} 
							icon='fas fa-pencil-alt'
							disabled={this.model.deleted_by() || !ChatState.getPermissions().edit}
						>
							{app.translator.trans('core.forum.post_controls.edit_button')}
						</Button>, <Separator />] : <div></div>
					}
					{this.model.deleted_by() ?
						[<Button 
							onclick={this.modelEvent.bind(this, 'dropdownRestore')} 
							icon='fas fa-reply'
						>
							{app.translator.trans('core.forum.post_controls.restore_button')}
						</Button>, <Separator />] : <div></div>
					}
					{!this.model.deleted_by() && ChatState.getPermissions().delete ?
						<Button 
							onclick={this.modelEvent.bind(this, 'dropdownHide')} 
							icon='fas fa-trash-alt'
							disabled={!ChatState.getPermissions().delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_button')}
						</Button> : <div></div>
					}
					{this.model.deleted_by() && ChatState.getPermissions().moderate.delete ?
						<Button 
							onclick={this.modelEvent.bind(this, 'dropdownDelete')} 
							icon='fas fa-trash-alt'
							disabled={!ChatState.getPermissions().delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_forever_button')}
						</Button> : <div></div>
					}
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

	configWrapper(vnode)
	{
		let element = vnode.dom;
		this.elementWrapper = element;

		if(this.needToFlash) this.needToFlash = false;
	}

	configFormat(vnode)
	{
		let element = vnode.dom;
		if(element.oldContent == this.message) return;
		element.oldContent = this.message;

		this.element = element;
		ChatState.renderChatMessage(element, this.message);
	}

	isVisible()
	{
		if(this.model.chat() != ChatState.getCurrentChat())
			return false;

		if(this.deleted_forever && (!ChatState.getPermissions().moderate.vision || !this.model.id()))
			return false;

		if(this.model.deleted_by() && (!ChatState.getPermissions().moderate.vision && (app.session.user && this.model.deleted_by().id() != app.session.user.id())))
			return false;

		return true;
	}

	controlHide()
	{
		this.model.save({actions: {hide: true}, relationships: {deleted_by: app.session.user}});
		this.hide(app.session.user);
	}

	hide(user)
	{
		if(user) this.model.pushData({relationships: {deleted_by: user}});
		m.redraw();
	}

	controlRestore()
	{
		this.model.save({actions: {hide: false}, deleted_by: 0});
		this.restore();
	}

	restore()
	{
		this.model.pushAttributes({deleted_by: 0});
		delete this.model.data.relationships.deleted_by;
		m.redraw();
	}

	controlDelete()
	{
		this.model.delete();
		this.delete();
	}

	delete()
	{
		this.deleted_forever = true;
		m.redraw();
	}

	controlEdit(content)
	{
		this.model.save({actions: {msg: content}, edited_at: new Date(), message: content});
		this.edit(content);
	}

	edit(content)
	{
		this.needToFlash = true;
		this.message = content;

		this.model.pushAttributes({message: content, edited_at: new Date()});
		m.redraw();

		ChatState.renderChatMessage(this.model, content);
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