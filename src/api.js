import Movies from './model/movies';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
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

  deleteComment(id) {
    return this._load({url: 'comments/' + id, method: Method.DELETE});
  }

  updateMovie(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(Movies.adaptToServer(film)),
    })
      .then(Api.toJSON)
      .then(Movies.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);
    headers.append('Content-Type', 'application/json');
    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  addComment(film, comment) {
    return this._load({
      url:'comments/' + film.id,
      method: Method.POST,
      body: JSON.stringify({
        comment: comment.text,
        emotion: comment.emoji,
      }),
    },
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
      return Movies.adaptToClient(film);
    });
  }
}
