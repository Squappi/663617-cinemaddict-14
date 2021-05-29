import Abstract from './abstract.js';

const createNumberOfFilms = (film) => {
  return `<p>${film} movies inside</p>`;
};

export default class SiteCreateNumberFilms extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createNumberOfFilms(this._films.length);
  }
}
