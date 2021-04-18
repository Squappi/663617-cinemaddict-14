import { createElement } from '../utils.js';

const createNumberOfFilms = () => {
  return '<p>130 291 movies inside</p>';
};

export default class SiteCreateNumberFilms {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createNumberOfFilms(this.popupElement);
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
