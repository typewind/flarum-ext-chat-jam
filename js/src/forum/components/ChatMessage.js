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

export default class ChatMessage extends Component
{
	init()
	{
		this.labels = [];
		Object.assign(this, this.props);
		
		this.message = this.model.message();
		this.textFormat();
		this.initLabels();
	}

	view()
	{
		return (
			<div 
				className={classList({
					'message-wrapper': true, 
					hidden: this.model.deleted_by(), 
					editing: this.is_editing, 
					deleted: !this.isVisible()}
					)}
				data-id={this.model.id()} 
				config={this.configWrapper.bind(this)}>
				<div>
					{this.model.user() ? 
						<a className='avatar-wrapper' href={app.route.user(this.model.user())} config={m.route}>
							<span>{avatar(this.model.user(), {className: 'avatar'})}</span>
						</a>
						:
						<div className='avatar-wrapper'>
							<span>{avatar(this.model.user(), {className: 'avatar'})}</span>
						</div>
					}
					<div className='message-block'>
						<div className='toolbar'>
							<a className='name' onclick={this.chatViewport.insertMention.bind(this.chatViewport, this)}>
								{username(this.model.user()).children[0] + ': '}
							</a>
							<div className='labels'>
								{this.labels.map(label => label.condition() ? label.component() : null)}
							</div>
							<div className='right'>
								{this.model.id() ? [
									this.deleted_forever ? null : this.editDropDown(),
									<a className='timestamp' title={fullTime(this.model.created_at()).children[0]}>{this.humanTime = humanTime(this.model.created_at())}</a>
								] 
								: this.timedOut ? this.editDropDownTimedOut() : null}
							</div>
						</div>
						<div className='message'>
							{this.model.is_censored() ?
								<div className='censored' title={app.translator.trans('pushedx-chat.forum.chat.message.censored')}>
									{this.message}
								</div>
								:
								<div config={this.configFormat.bind(this)}></div>
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
			() => this.timedOut, 
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
							onclick={this.chatViewport.messageEdit.bind(this.chatViewport, this)} 
							icon='fas fa-pencil-alt'
							disabled={this.model.deleted_by() || this.chatViewport.messageEditing || !this.chatViewport.permissions.edit}
						>
							{app.translator.trans('core.forum.post_controls.edit_button')}
						</Button>, <Separator />] : <div></div>
					}
					{this.model.deleted_by() ?
						[<Button 
							onclick={this.controlRestore.bind(this)} 
							icon='fas fa-reply'
						>
							{app.translator.trans('core.forum.post_controls.restore_button')}
						</Button>, <Separator />] : <div></div>
					}
					{!this.model.deleted_by() && this.chatViewport.permissions.delete ?
						<Button 
							onclick={this.controlHide.bind(this)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatViewport.permissions.delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_button')}
						</Button> : <div></div>
					}
					{this.model.deleted_by() && this.chatViewport.permissions.moderate.delete ?
						<Button 
							onclick={this.controlDelete.bind(this)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatViewport.permissions.delete}
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
						onclick={this.delete.bind(this)} 
						icon='fas fa-trash-alt'
					>
						{app.translator.trans('pushedx-chat.forum.chat.message.actions.hide')}
					</Button>
					<Button 
						onclick={this.chatViewport.messageResend.bind(this.chatViewport, this)}
						icon='fas fa-reply'
					>
						{app.translator.trans('pushedx-chat.forum.chat.message.actions.resend')}
					</Button>
				</Dropdown>
			</div>
		)
	}

	configWrapper(element)
	{
		this.elementWrapper = element;

		if(this.needToFlash) 
		{
			this.flash();
			this.needToFlash = false;
		}
	}

	configFormat(element, isInitialized)
	{
		if(element.chatMessage == this.message) return;

		element.chatMessage = this.message;
		this.element = element;
		this.textFormat();

		if(this.chatViewport.chatOnResize) this.chatViewport.chatOnResize();
	}

	textFormat(text)
	{
		let self = this;
		this.message = text ?? this.message;
		if(this.element) s9e.TextFormatter.preview(this.message, this.element);

		setTimeout(() => {
			$('.neonchat script').each(function() {
				if(!self.executedScripts) self.executedScripts = {};
				let scriptURL = $(this).attr('src');
				if(!self.executedScripts[scriptURL])
				{
					var scriptTag = document.createElement("script");
					scriptTag.src = scriptURL;
					document.head.appendChild(scriptTag);

					self.executedScripts[scriptURL] = true;
				}
			});
		}, 10);
	}

	isVisible()
	{
		if(this.viewportHidden)
			return false;

		if(this.deleted_forever && (!this.chatViewport.permissions.moderate.vision || !this.model.data.attributes.id))
			return false;

		if(this.model.deleted_by() && (!this.chatViewport.permissions.moderate.vision && (app.session.user && this.model.deleted_by().id() != app.session.user.id())))
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

		this.textFormat();
	}

	flash()
	{
		if(!this.elementWrapper) this.needToFlash = true;
		else this.flashItem($(this.elementWrapper));
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