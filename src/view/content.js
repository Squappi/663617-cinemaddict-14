import dayjs from 'dayjs';
import { formatDuration } from '../mock/const.js';
import Abstract from './utils-abstract.js';

const createContentList = (film) => {
  const {
    poster, nameFilm, rating, year, duration, genre, description, comments,
    allMovies: {
      watchList: watchList,
      history: history,
      favorites: favorites,
    },
  } = film;
  let descriptionStr = description;

  if (descriptionStr.length > 140) {
    descriptionStr = descriptionStr.substring(0, 139).concat('...');
  }

  return `<article class="film-card">
    <h3 class="film-card__title">${nameFilm}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(year).format('YYYY')}</span>
      <span class="film-card__duration">${formatDuration(duration)}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionStr}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${watchList ? ' film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${history ? ' film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite${favorites ? ' film-card__controls-item--active' : ''} " type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteCreateView extends Abstract {
  constructor(film) {
    super();
    this._content = film;

    this._editHandlerForm = this._editHandlerForm.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToHistoryHandler = this._addToHistoryHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
  }

  getTemplate() {
    return createContentList(this._content);
  }

  _editHandlerForm(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditHandlerForm(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelectorAll('.film-card__poster,.film-card__title,.film-card__comments')
      .forEach((element) => element.addEventListener('click', this._editHandlerForm));
  }

  _addToWatchListHandler() {
    this._callback.addToWatchList();
  }

  setToWatchList(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWatchListHandler);
  }

  _addToHistoryHandler() {
    this._callback.addToHistoryList();
  }

  setToHistoryList(callback) {
    this._callback.addToHistoryList = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._addToHistoryHandler);
  }

  _addToFavoriteHandler() {
    this._callback.addToFavoriteList();
  }

  setToFavoriteList(callback) {
    this._callback.addToFavoriteList = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._addToFavoriteHandler);
  }
}
