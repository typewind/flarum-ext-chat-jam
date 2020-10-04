import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import fullTime from 'flarum/helpers/fullTime';
import humanTime from 'flarum/utils/humanTime';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import extractText from 'flarum/utils/extractText';

import DropDown from 'flarum/components/Dropdown';
import Button from 'flarum/components/Button';
import Separator from 'flarum/components/Separator';

export default class ChatMessage extends Component
{
	init()
	{
		this.inited = false;
		this.labels = [];
		Object.assign(this, this.props);

		this.user = app.store.getById('users', this.actor);
        if(this.user == undefined)
        {
			app.store.find('chat/user', this.actor).then((user) =>
			{
				if(user.data.id != '') this.user = user;
				this.initEvents();
			});
		}
		else this.initEvents();

		if(this.deleted_by) this.hide(this.deleted_by);
		
		this.textFormat();
		this.instanceGetter(this);
	}

	initEvents()
	{
		this.inited = true;

		this.userResolved(this);
		this.initLabels();

		m.redraw();
	}

	view()
	{
		return (
			<div 
				className={[
					'message-wrapper', 
					this.deleted_by ? 'deleted' : '',
					this.is_editing ? 'editing' : ''
				].join(' ')}
				data-id={this.id} 
				config={this.configWrapper.bind(this)}>
				{this.inited ?
					<div>
						{this.user ? 
							<a className='avatar-wrapper' href={app.route.user(this.user)} config={m.route}>
								<span>
									{avatar(this.user, {className: 'avatar'})}
								</span>
							</a>
							:
							<div className='avatar-wrapper'>
								<span>
									{avatar(this.user, {className: 'avatar'})}
								</span>
							</div>
						}
						<div className='message-block'>
							<div className='toolbar'>
								<a className='name' onclick={this.chatViewport.insertMention.bind(this.chatViewport, this)}>
									{username(this.user).children[0] + ': '}
								</a>
								{this.id ?
									<div style='display: inline'>
										<a className='timestamp' title={fullTime(this.created_at).children[0]}>{this.humanTime = humanTime(this.created_at)}</a>
										<div className='labels'>
											{this.labels.map(label => label.condition() ? label.component() : null)}
										</div>
										{this.deleted_forever ? null : this.editDropDown()}
									</div> : (this.timedOut ? 
									<div style='display: inline'>	
										<div className='labels'>
											{this.labels.map(label => label.condition() ? label.component() : null)}
										</div>
										{this.editDropDownTimedOut()}
									</div> : null)
								}
							</div>
							<div className='message'>
								{this.censored ?
									<div className='censored' title={app.translator.trans('pushedx-chat.forum.chat.message.censored')}>
										{this.message}
									</div>
									:
									<div config={this.configFormat.bind(this)}>

									</div>
								}
							</div>
						</div>
					</div>
					: <LoadingIndicator className='loading-old Button-icon' />
				}
			</div>
		)
	}

	initLabels()
	{
		this.labelBind(
			() => this.edited_at, 
			() => (
				<div class='icon' title={extractText(app.translator.trans(
					'core.forum.post.edited_tooltip',
					{user: this.user, ago: humanTime(this.edited_at)}
				))}>
					<i class="fas fa-pencil-alt"></i>
				</div>
			)
		);

		this.labelBind(
			() => this.deleted_by, 
			() => (
				<div class='icon'>
					<i class="fas fa-trash-alt"></i> <span>{'(' + app.translator.trans('pushedx-chat.forum.chat.message.deleted' + (this.deleted_forever ? '_forever' : ''))} {this.user_deleted_by ? (username(this.user_deleted_by).children[0]  + ')') : null}</span>
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
				<DropDown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					{this.user && this.user == app.session.user ?
						[<Button 
							onclick={this.chatViewport.messageEdit.bind(this.chatViewport, this)} 
							icon='fas fa-pencil-alt'
							disabled={this.deleted_by || this.chatViewport.messageEditing || !this.chatViewport.permissions.edit}
						>
							{app.translator.trans('core.forum.post_controls.edit_button')}
						</Button>, <Separator />] : <div></div>
					}
					{this.deleted_by ?
						[<Button 
							onclick={this.restore.bind(this)} 
							icon='fas fa-reply'
						>
							{app.translator.trans('core.forum.post_controls.restore_button')}
						</Button>, <Separator />] : <div></div>
					}
					{!this.deleted_by && this.chatViewport.permissions.delete ?
						<Button 
							onclick={this.delete.bind(this)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatViewport.permissions.delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_button')}
						</Button> : <div></div>
					}
					{this.deleted_by && this.chatViewport.permissions.moderate.delete ?
						<Button 
							onclick={this.delete.bind(this, true)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatViewport.permissions.delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_forever_button')}
						</Button> : <div></div>
					}
				</DropDown>
			</div>
		)
	}
	
	editDropDownTimedOut()
	{
		return (
			<div className='edit'>
				<DropDown 
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
				</DropDown>
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
		if(!text) text = this.message;
		if(this.element) s9e.TextFormatter.preview(text, this.element);

		setTimeout(() => {
			$('.chat script').each(function() {
				eval.call(window, $(this).text());
			});
		}, 1000);
	}

	delete(e, forever)
	{
		if(!this.id)
		{
			this.deleted_forever = true;
			this.elementWrapper.style.display = 'none';
			return;
		}

		this.deleted_by = app.session.user.id();
		if(forever) 
		{
			this.deleted_forever = forever;
			this.elementWrapper.style.display = 'none';
			this.apiDelete(forever);
		}
		else 
		{
			this.apiEdit({hide: true});
			this.hide(this.deleted_by);
		}
	}

	hide(deleted_by)
	{
		this.deleted_by = deleted_by;
		if(this.deleted_by == app.session.user.id()) this.user_deleted_by = app.session.user;
		else
		{
			this.user_deleted_by = app.store.getById('users', this.deleted_by);
			if(this.user_deleted_by == undefined)
			{
				app.store.find('chat/user', this.deleted_by).then((user) =>
				{
					if(user.data.id != '') 
					{
						this.user_deleted_by = user;
						m.redraw();
					}
				});
			}
		}
		m.redraw();
	}

	restore()
	{
		this.deleted_by = null;
		this.apiEdit({hide: false});
	}

	edit(newContent, outside = false)
	{
		this.edited_at = new Date();
		this.message = newContent;
		this.needToFlash = true;

		this.textFormat();

		if(!outside) this.apiEdit({msg: newContent});

		m.redraw();
	}

    apiEdit(attributes)
    {
        app.request({
            method: 'PATCH',
            url: app.forum.attribute('apiUrl') + '/chatmessages/' + this.id,
            data: {attributes: attributes}
        })
	}
	
	apiDelete()
	{
        app.request({
            method: 'DELETE',
            url: app.forum.attribute('apiUrl') + '/chatmessages/' + this.id
        })
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