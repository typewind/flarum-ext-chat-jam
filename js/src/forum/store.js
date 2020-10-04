export default function extendGlobalStore(models) 
{
	app.store.models = Object.assign(app.store.models, models);
}