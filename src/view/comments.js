import dayjs from 'dayjs';
import Abstract from './utils-abstract';

const createComments = (comment) => {
  const { emoji, data, author, message } = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(data).format('YYYY/MM/DD HH:MM')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class CommentView extends Abstract {
  constructor(comment) {
    super();
    this._comment = comment;
  }
  getTemplate() {
    return createComments(this._comment);
  }

  _setDeleteHandler(evt) {
    evt.preventDefault();
    console.log(evt);
    // this._callback.deleteComment(this._comment);
  }

  setDeleteHandler(callback) {
    this._callback.deleteComment = callback;
    this.getElement().querySelector('.film-details__comment-delete')
      .addEventListener('click', this._setDeleteHandler);
  }
}
