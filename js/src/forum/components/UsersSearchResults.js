import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import highlight from 'flarum/helpers/highlight';

import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class UsersSearchResults {
	constructor(props) {
		this.results = {};
		this.props = props;
		this.searching = false;

		if(!props.store.usersSelected) props.store.usersSelected = [];
		this.usersSelected = props.store.usersSelected;
	}

	search(query) {
		this.searching = true;

		return app.store
		.find('users', {
			filter: { q: query },
			page: { limit: 5 },
		})
		.then((results) => {
			this.results[query] = results;
			this.searching = false;
			m.redraw();
		});
	}

	isUserSelected(user)
	{
		return this.usersSelected.some(u => user.id() == u.id());
	}

	userClick(user)
	{
		if(this.props.callback)
		{
			if(this.props.callback(user, this.isUserSelected(user)))
			{
				if(!this.isUserSelected(user))
					this.usersSelected.push(user)
			}
			else 
			{
				if(this.isUserSelected(user))
					this.usersSelected = this.usersSelected.filter(u => u.id() != user.id());
			}

		}
	}

	view(query) {
		query = query.toLowerCase();
		let localUserId;
		if(app.session.user) localUserId = app.session.user.id();

		const usersList = (this.results[query] || [])
		.concat(
			app.store
			.all('users')
			.filter(user => [user.username(), user.displayName()].some((value) => value.toLowerCase().substr(0, query.length) === query))
		).filter(user => user.id() != localUserId);
		
		const resultsFind = usersList
		.filter((e, i, arr) => arr.lastIndexOf(e) === i)
		.sort((a, b) => a.displayName().localeCompare(b.displayName()));

		const resultsSelected = Object.values(this.usersSelected).slice(-5);

		if (!resultsFind.length)
		{
			if(!this.searching) return <li className="SearchFailed">{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.search.failed')}</li>
			else LoadingIndicator.component({size: 'tiny', className: 'Button Button--icon Button--link'});
		}

		return [
			<li className="Dropdown-header">{app.translator.trans('core.forum.search.users_heading')}</li>,
			resultsFind.map((user) => {
				const name = username(user);
				const id = user.id();
				name.children[0] = highlight(name.children[0], query);

				return (
				<li 
					className="UserSearchResult UserSearchResult" 
					data-index={'users' + id}
					onclick={this.userClick.bind(this, user)}
				>
					<span class={(this.usersSelected[id] ? 'selected' : null)}>
						{avatar(user)}
						{name}
					</span>
				</li>
				);
			}),
			resultsSelected.length ? 
				<li className="Dropdown-header">{app.translator.trans('pushedx-chat.forum.chat.list.add_modal.search.invited')}</li>
				: null,
			resultsSelected.map((user) => {
				const name = username(user);
				name.children[0] = highlight(name.children[0], query);

				return (
					<li 
						className="UserSearchResult UserSearchResult" 
						data-index={'users' + user.id()}
						onclick={this.userClick.bind(this, user)}
					>
						<span class='selected'>
							{avatar(user)}
							{name}
						</span>
					</li>
				)
			}),
		];
	}
}