import DS from 'ember-data';

export default DS.Model.extend({
	timestamp: DS.attr('number'),
  text: DS.attr('string'),
  complete: DS.attr('boolean', {defaultValue: false}),
  sprint: DS.belongsTo('sprint', {async: true}),
  owner: DS.belongsTo('owner', {async: true})
});
