import dayjs from 'dayjs';
import Observer from '../observer';

export default class Movies extends Observer {
  constructor() {
    super();
    this._isLoading = true;
    this._films = [];
  }

  isLoading() {
    return this._isLoading;
  }

  setFilms(films) {
    this._films.push(...films);
    this._isLoading = false;
    this._notify('setFilms', films);
  }

  getTasks(filter) {
    if (!filter || filter === 'AllMovies') {
      return this._films;
    } else {
      return this._films.filter((film) => {
        switch (filter) {
          case 'watchlist':
            return film.allMovies.watchList;
          case 'history':
            return film.allMovies.history;
          case 'favorites':
            return film.allMovies.favorites;
          default:
            return true;
        }
      });
    }
  }

  updateFilm(updatedFilm) {
    const oldFilmIndex = this._films.findIndex((film) => {
      return film.id === updatedFilm.id;
    });

    if (oldFilmIndex >= 0) {
      const copyFilms = this._films.slice();
      copyFilms[oldFilmIndex] = updatedFilm;
      this._films = copyFilms;
      this._notify('updateTasks', this._films);
    }
  }

  static adaptToClient(film) {
    const adaptedMovie = Object.assign(
      {},
      film,
      {
        id: film.id,
        poster: film.film_info.poster,
        nameFilm: film.film_info.title,
        rating: film.film_info.total_rating,
        year: dayjs(film.film_info.release.date).format('YYYY'),
        duration: film.film_info.runtime,
        genre: film.film_info.genre,
        description: film.film_info.description,
        ageRestriction: film.film_info.age_rating,
        director: film.film_info.director,
        writter: film.film_info.writers,
        releaseDate: dayjs(film.film_info.release.date).format('DD MMMM YYYY'),
        country: film.film_info.release.release_country,
        actors: film.film_info.actors,
        originalTitle: film.film_info.alternative_title,
        allMovies: {
          watchList: film.user_details.watchlist,
          history: film.user_details.already_watched,
          watchDate: dayjs(film.user_details.watching_date),
          favorites: film.user_details.favorite,
        },
      },
    );
    delete adaptedMovie.user_details;
    delete adaptedMovie.film_info;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'film_info': {
          'title': movie.nameFilm,
          'alternative_title': movie.originalTitle,
          'poster': movie.poster,
          'description': movie.description,
          'total_rating': movie.rating,
          'release': {
            'date': movie.releaseDate,
            'release_country': movie.country,
          },
          'runtime': movie.duration,
          'genre': movie.genre,
          'director': movie.director,
          'writers': movie.writter,
          'actors': movie.actors,
          'age_rating': movie.ageRestriction,
        },
        'user_details': {
          'watchlist': movie.allMovies.watchList,
          'already_watched': movie.allMovies.history,
          'watching_date': movie.allMovies.watchDate,
          'favorite': movie.allMovies.favorites,
        },
      },
    );

    delete adaptedMovie.poster;
    delete adaptedMovie.nameFilm;
    delete adaptedMovie.rating;
    delete adaptedMovie.year;
    delete adaptedMovie.duration;
    delete adaptedMovie.genre;
    delete adaptedMovie.description;
    delete adaptedMovie.comment;
    delete adaptedMovie.ageRestriction;
    delete adaptedMovie.director;
    delete adaptedMovie.writter;
    delete adaptedMovie.releaseDate;
    delete adaptedMovie.country;
    delete adaptedMovie.actors;
    delete adaptedMovie.allMovies;
    delete adaptedMovie.originalTitle;

    return adaptedMovie;
  }
}
