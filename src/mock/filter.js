import {createElement} from '../utils.js';
import {createFilterTemplete} from '../view/site-menu.js';

const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.allMovies.watchList).length,
  history: (films) => films.filter((film) => film.allMovies.history).length,
  favorites: (films) => films.filter((film) => film.allMovies.favorites).length,
};

const getFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};

export default class SiteMenuFilter {
  constructor(filters) {
    this._filter = filters;
    this._element = null;
  }
  getTemplate() {
    return createFilterTemplete(getFilter(this._filter));
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
