import DS from 'ember-data';

export default DS.Model.extend({
  goals: DS.hasMany('goal', {async: true})
});
