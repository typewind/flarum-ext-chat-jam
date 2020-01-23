import SettingsModal from 'flarum/components/SettingsModal';

export default class ChatSettingsModal extends SettingsModal 
{
	className() 
	{
		return 'Modal--small';
	}

	title() 
	{
		return app.translator.trans('pushedx-chat.admin.settings.title');
	}

	form() {
		return [
			<div className='Form-group'>
				<label>{app.translator.trans('pushedx-chat.admin.settings.charlimit')}</label>
				<input className='FormControl' type='number' max='1024' bidi={this.setting('pushedx-chat.charlimit')}/>
			</div>
		];
	}
}
