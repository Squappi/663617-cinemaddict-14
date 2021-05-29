import { createFilterTemplate } from './site-menu.js';
import Abstract from './abstract.js';

const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.allMovies.watchList).length,
  history: (films) => films.filter((film) => film.allMovies.history).length,
  favorites: (films) => films.filter((film) => film.allMovies.favorites).length,
};

const getFilter = (films, activeFilter) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
      active: filterName === activeFilter,
    };
  });
};

export default class SiteMenuFilter extends Abstract{
  constructor(films, filter = 'AllMovies') {
    super();
    this._films = films;
    this._filter = filter;

    this._getFilterWatchlistHandler = this._getFilterWatchlistHandler.bind(this);
    this._setStatsHandler = this._setStatsHandler.bind(this);
  }
  getTemplate() {
    return createFilterTemplate(getFilter(this._films, this._filter), this._filter === 'AllMovies');
  }

  _getFilterWatchlistHandler(evt) {
    if(evt.target.classList.contains('main-navigation__item--active')) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType ?
      evt.target.dataset.filterType : evt.target.parentElement.dataset.filterType);

    this.getElement().querySelectorAll('.main-navigation__item').forEach((button) => {
      button.classList.remove('main-navigation__item--active');
    });
    this.getElement().querySelector('.main-navigation__additional')
      .classList.remove('main-navigation__item--active');
    if (!evt.target.dataset.filterType) {
      evt.target.parentElement.classList.add('main-navigation__item--active');
    } else {
      evt.target.classList.add('main-navigation__item--active');
    }
  }

  setFilterWatchlistHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
      if (element.children[0]) {
        element.children[0].addEventListener('click', this._getFilterWatchlistHandler);
      }
      element.addEventListener('click', this._getFilterWatchlistHandler);
    });
  }

  _setStatsHandler(evt) {
    evt.preventDefault();
    this.getElement().querySelectorAll('.main-navigation__item').forEach((button) => {
      button.classList.remove('main-navigation__item--active');
    });
    evt.target.classList.add('main-navigation__item--active');
    this._callback.showStats();
  }

  setStatsHandler(callback) {
    this._callback.showStats = callback;
    this.getElement().querySelector('.main-navigation__additional')
      .addEventListener('click', this._setStatsHandler);
  }
}
