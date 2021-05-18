import { createFilterTemplete } from '../view/site-menu.js';
import Abstract from '../view/utils-abstract.js';

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

export default class SiteMenuFilter extends Abstract{
  constructor(filters) {
    super();
    this._filter = filters;

    this._getFilterWatchlistHandler = this._getFilterWatchlistHandler.bind(this);
  }
  getTemplate() {
    return createFilterTemplete(getFilter(this._filter));
  }

  _getFilterWatchlistHandler(evt) {
    if(evt.target.tagName !== 'A') {
      return;
    }

    if(evt.target.classList.contains('main-navigation__item--active')) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);

    this.getElement().querySelectorAll('.main-navigation__item').forEach((button) => {
      button.classList.remove('main-navigation__item--active');
    });
    evt.target.classList.add('main-navigation__item--active');
  }

  setFilterWatchlistHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
      element.addEventListener('click', this._getFilterWatchlistHandler);
    });
  }
}
