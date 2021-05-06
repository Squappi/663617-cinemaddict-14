import Abstract from './utils-abstract.js';

const createNumberOfFilms = (task) => {
  return `<section class="footer__statistics">
      <p>${task} movies inside</p>
  </section>`;
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
