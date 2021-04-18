import { createElement } from '../utils.js';

const createButtonList = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class SiteMenuSort {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createButtonList();
  }
  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
