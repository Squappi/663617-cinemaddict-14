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
  }
  getTemplate() {
    return createFilterTemplete(getFilter(this._filter));
  }
}
