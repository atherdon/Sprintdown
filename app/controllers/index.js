import Ember from 'ember';

var scrollBottom = function() {
	$("body").animate({ scrollTop: $('body')[0].scrollHeight}, 750, 'swing');
}

export default Ember.Controller.extend({

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

		updateGoal: function(goal) {
			let text = goal.get('text');
			if(event.keyCode == 8 && text == "") {
				goal.destroyRecord();
			}
			else {
				this.store.find('goal', goal.id).then(function(goal) {
				  goal.set('text', text);
				  goal.save();
				});
			}
		},

		newSprint: function() {
			var sprintAttrs = {};
			if (this.get("latestSprint")) {
				sprintAttrs = {number: this.get("latestSprint").get("number")+1}
			}
			let newSprint = this.store.createRecord('sprint', sprintAttrs);
			newSprint.save();
			scrollBottom();
		},

		newOwner: function() {
			let newOwner = this.store.createRecord('owner', {
				name: this.get('name')
			});
			newOwner.save();
			this.setProperties({
				text: ''
			});
		},

		toggle: function(goal) {
			if (goal.get('complete')) {
				goal.set('complete', false)
			}
			else {
				goal.set('complete', true)
			}
			goal.save();
		}
	}
});
