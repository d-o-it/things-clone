import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias, not } from '@ember/object/computed';

export default Component.extend({
  i18n: service(),
  router: service(),
  itemSelector: service(),
  classNames: ['c-item', 'js-item'],
  classNameBindings: ['isCompleted', 'isCanceled', 'isSelected', 'isSortable'],
  isCompleted: alias('item.isCompleted'),
  isCanceled: alias('item.isCanceled'),
  isSortable: not('isEditing'),

  placeholder: computed('i18n.locale', function() {
    return this.i18n.t('item-project.placeholder');
  }),

  isSelected: computed('itemSelector.items.[]', function() {
    return this.itemSelector.isSelected(this.item);
  }),

  mouseDown(event) {
    this.selectItem(event);
  },

  doubleClick() {
    this.router.transitionTo('project', this.item);
  },

  onSelectOnlyItem() {
    this.itemSelector.selectOnly(this.item);
  },

  onSelectItem() {
    this.itemSelector.select(this.item);
  },

  selectItem({ target, metaKey, shiftKey }) {
    if (this.element.querySelector('.js-checkbox').contains(target)) {
      return;
    }

    if (shiftKey && this.itemSelector.hasItems) {
      this.itemSelector.select(this.item);
      this.selectBetween(this.element);
    } else if (metaKey) {
      this.itemSelector.toggle(this.item);
    } else {
      this.itemSelector.selectOnly(this.item);
    }
  }
});
