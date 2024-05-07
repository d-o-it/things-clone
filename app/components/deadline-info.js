import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias, equal, lt } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  i18n: service(),
  clock: service(),
  deadline: null,
  classNameBindings: ['isToday', 'isOverdue'],

  currentDate: alias('clock.date'),
  isToday: equal('daysLeft', 0),
  isOverdue: lt('daysLeft', 0),

  daysLeft: computed('currentDate', 'deadline', function() {
    // Ignoring hours and minutes
    let date = new Date(this.currentDate.toDateString());
    return moment(date).diff(this.deadline, 'days') * -1;
  }),

  deadlineInfo: computed('i18n.locale', 'daysLeft', function() {
    if (this.isToday) {
      return this.i18n.t('deadline-info.today');
    }

    let daysCount = Math.abs(this.daysLeft);
    let daysOrDay = this.i18n.t('deadline-info.days', { count: daysCount });
    let leftOrAgo = this.isOverdue ? this.i18n.t('deadline-info.ago') : this.i18n.t('deadline-info.left');

    return `${daysCount} ${daysOrDay} ${leftOrAgo}`;
  })
});
