import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  taskEditor: service(),
  classNames: ['c-task'],
  classNameBindings: ['isEditable'],
  task: null,

  isEditable: computed('taskEditor.currentTask', function() {
    return this.taskEditor.isCurrent(this.task);
  }),

  didRender() {
    this._super(...arguments);
    this.autofocus();
  },

  actions: {
    onEnter() {
      this.taskEditor.setCurrentTask(null);
    }
  },

  autofocus() {
    if (this.isEditable) {
      this.element.querySelector('.js-task-input').focus();
    }
  }
});