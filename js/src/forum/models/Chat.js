import Model from 'flarum/Model';

export default class Chat extends Model {}

Object.assign(Chat.prototype, 
{
	title: Model.attribute('title'),
	color: Model.attribute('color'),
	type: Model.attribute('type'),
	created_at: Model.attribute('created_at', Model.transformDate),
	creator: Model.hasOne('creator'),
	users: Model.hasMany('users'),
	last_message: Model.hasOne('last_message')
});