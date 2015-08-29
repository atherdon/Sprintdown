import DS from 'ember-data';

export default DS.Model.extend({
	timestamp: DS.attr('number'),
  text: DS.attr('string'),
  sprint: DS.belongsTo('sprint', {async: true})
});
