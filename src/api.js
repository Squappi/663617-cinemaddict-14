import dayjs from 'dayjs';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._updateFilmStructure = this._updateFilmStructure.bind(this);
  }

  getMovies() {
    return this._load({url: 'movies'})
      .then(Api.toJSON).then(this._updateFilmStructure);
  }

  getComments(id) {
    return this._load({url: 'comments/' + id})
      .then(Api.toJSON);
  }

  updateMovie(film) {
    return this._load({
      url: `tasks/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  addComment(film, comment) {
    return this._load({
      url:'comment/' + film.id,
      method: Method.POST,
      body:{
        comment: comment.text,
        emotion: comment.emoji,
      }},
    ).then(Api.toJSON);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  _updateFilmStructure(films) {
    return films.map((film) => {
      return {
        id: film.id,
        poster: film.film_info.poster,
        nameFilm: film.film_info.title,
        rating: film.film_info.total_rating,
        year: dayjs(film.film_info.release.date).format('YYYY'),
        duration: film.film_info.runtime,
        genre: film.film_info.genre,
        description: film.film_info.description,
        comment: film.comments,
        ageRestriction: film.film_info.age_rating,
        director: film.film_info.director,
        writter: film.film_info.writers,
        releaseDate: dayjs(film.film_info.release.date).format('DD MMMM YYYY'),
        country: film.film_info.release.release_country,
        actors: film.film_info.actors,
        allMovies: {
          watchList: film.user_details.watchlist,
          history: film.user_details.already_watched,
          favorites: film.user_details.favorite,
        },
        watchHistory: {
          isWatch: film.user_details.already_watched,
          watchDate: dayjs(film.user_details.watching_date),
        },
      };
    });
  }
}
