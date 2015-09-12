import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return {
			sprints: this.store.find('sprint'),
			owners: this.store.find('owner')
		}
	}
});
