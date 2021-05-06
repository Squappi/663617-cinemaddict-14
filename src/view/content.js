import Abstract from './utils-abstract.js';

const createContentList = (task) => {
  const {poster, nameFilm, rating, year, duration, genre, description, comment} = task;
  let descriptionStr = description;

  if (descriptionStr.length > 140) {
    descriptionStr = descriptionStr.substring(0, 140).concat('...');
  }

  return `<article class="film-card">
    <h3 class="film-card__title">${nameFilm}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionStr}</p>
    <a class="film-card__comments">${comment.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteCreateView extends Abstract {
  constructor(task) {
    super();
    this._content = task;

    this._editHandlerForm = this._editHandlerForm.bind(this);
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
    this.getElement().addEventListener('click', this._editHandlerForm);
  }
}
