import Model from 'flarum/Model';

export default class Message extends Model {}

Object.assign(Message.prototype, 
{
	message: Model.attribute('message'),
	user: Model.hasOne('user'),
	deletedBy: Model.hasOne('deleted_by'),
	chat: Model.hasOne('chat'),
	createdAt: Model.attribute('created_at', Model.transformDate),
	editedAt: Model.attribute('edited_at', Model.transformDate),
	isReaded: Model.attribute('is_readed'),
	ipAddress: Model.attribute('ip_address'),
});