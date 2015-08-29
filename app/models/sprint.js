import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr('number', {defaultValue: 1}),
  goals: DS.hasMany('goal', {async: true})
});
