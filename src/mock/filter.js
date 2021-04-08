const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.allMovies.watchList).length,
  history: (films) => films.filter((film) => film.allMovies.history).length,
  favorites: (films) => films.filter((film) => film.allMovies.favorites).length,
};

export const getFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
