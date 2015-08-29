import Ember from 'ember';

var scrollBottom = function() {
	$("body").animate({ scrollTop: $('body')[0].scrollHeight}, 750, 'swing');
}

export default Ember.Controller.extend({
	// init: function () {
 //    this._super();
 //    Ember.run.schedule("afterRender",this, scrollBottom());
 //  },
	sprints: Ember.computed("model.@each", function() {
		return this.get('model').map((sprint) => {
				return Ember.ObjectProxy.create({
					content: sprint,
					isLatest: this.get("latestSprint.number") === sprint.get("number")
				});
			}
		)
	}),
	latestSprint: Ember.computed("model.@each", function() {
		return this.get("model").sortBy("number").get("lastObject");
	}),
	actions: {
		newGoal: function(sprint) {
			let newGoal = this.get("store").createRecord('goal', {
				text: this.get('text'),
				timestamp: Date.now(),
				sprint: sprint
			});
			sprint.get('content.goals').addObject(newGoal);
			newGoal.save().then(function() {
				return sprint.get('content').save();
			});
			this.setProperties({
				text: ''
			});
			scrollBottom();
		},
		newSprint: function() {
		
			var sprintAttrs = {};
			if (this.get("latestSprint")) {
				sprintAttrs = {number: this.get("latestSprint").get("number")+1}
			}
			let newSprint = this.store.createRecord('sprint', sprintAttrs);
			newSprint.save();
			scrollBottom();
		}
	}
});
