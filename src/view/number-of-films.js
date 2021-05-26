import Abstract from './utils-abstract.js';

const createNumberOfFilms = (film) => {
  return `<p>${film} movies inside</p>`;
};

export default class SiteCreateNumberFilms extends Abstract {
  constructor(arr) {
    super();
    this.newArr = arr;
  }
  getTemplate() {
    return createNumberOfFilms(this.newArr.length);
  }
}
