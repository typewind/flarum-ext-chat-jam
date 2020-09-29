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

export default class ChatPreview extends Component
{
	init()
	{
		Object.assign(this, this.props);
	}

	view()
	{
		return <div className={'panel-preview ' + (this.active ? 'active' : '')}></div>
	}
}