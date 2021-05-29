import dayjs from 'dayjs';
import {formatDuration} from '../mock/const.js';
import Smart from '../presenter/smart.js';
import he from 'he';

const EMOJIES = ['smile', 'sleeping', 'puke', 'angry'];
const SHAKE_TIME = 1000;

const createPopup = (film, state = {}, comment) => {
  const {
    nameFilm,
    originalTitle,
    poster,
    ageRestriction,
    director,
    writter,
    rating,
    releaseDate,
    country,
    duration,
    genre,
    actors,
    description,
    allMovies: {
      watchList: watchList,
      history: history,
      favorites: favorites,
    },
  } = film;


  const getGenre = (genre) => `<span className="film-details__genre">${genre}</span>`;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">+${ageRestriction}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${nameFilm}</h3>
              <p class="film-details__title-original">${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writter}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(releaseDate).format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">
              ${genre.slice(0, 3).map(getGenre).join(' ')}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${watchList ? ' checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${history ? ' checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${favorites ? ' checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comment.length}</span></h3>

        <ul class="film-details__comments-list">
        ${comment.map(({emotion, comment, author, data, id}) => `
          <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion ? emotion + '.png' : 'smile.png'}" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${dayjs(data).format('YYYY/MM/DD HH:MM')}</span>
              <button class="film-details__comment-delete" data-id = ${id} >Delete</button>
            </p>
          </div>
        </li>`).join('')}
      </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${state.emoji ? `<img src="images/emoji/${state.emoji}.png" width="55" height="55" alt="emoji-smile">` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(state.text || '')}</textarea>
          </label>

          <div class="film-details__emoji-list">
            ${EMOJIES.map((emoji) => `
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji ? emoji : 'smile'}" value="${emoji ? emoji : 'smile'}"${emoji === state.emoji ? ' checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emoji ? emoji : 'smile'}">
              <img src="./images/emoji/${emoji ? emoji : 'smile'}.png" width="30" height="30" alt="emoji">
            </label>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class SiteCreatePopup extends Smart {
  constructor(film, api) {
    super();
    this._film = film;
    this._state = {};
    this._api = api;
    this._isLoading = false;
    this._comments = [];

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToHistoryHandler = this._addToHistoryHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._setDeleteHandler = this._setDeleteHandler.bind(this);
    this._addComment = this._addComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.errorComment = this.errorComment.bind(this);

    this.restoreHandlers();
  }

  getTemplate() {
    return createPopup(this._film, this._state, this._comments || []);
  }

  setComments(comments) {
    this._comments = comments;
    this.updateElement();
  }

  clearTextArea() {
    this._state.text = '';
    this._state.emoji = '';
    this.updateElement();
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
    evt.target.removeEventListener('click', this._closeClickHandler);
  }

  setCloseHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }

  //WatchList

  _addToWatchListHandler() {
    this._callback.addToWatchList();
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._addToWatchListHandler);
  }

  //History

  _addToHistoryHandler() {
    this._callback.addToHistory();
  }

  setAddToHistoryHandler(callback) {
    this._callback.addToHistory = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._addToHistoryHandler);
  }

  // Favorites

  _addToFavoritesHandler() {
    this._callback.addToFavorite();
  }

  setAddFavoritesHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._addToFavoritesHandler);
  }

  // emoji

  restoreHandlers() {
    this._addEmojiListener();
    this._addTextAreaListener();

    if (this._callback.closeClick) {
      this.setCloseHandler(this._callback.closeClick);
    }
    if (this._callback.addToWatchList) {
      this.setAddToWatchListHandler(this._callback.addToWatchList);
    }
    if (this._callback.deleteComment) {
      this.setDeleteHandler(this._callback.deleteComment);
    }
    if (this._callback.addToHistory) {
      this.setAddToHistoryHandler(this._callback.addToHistory);
    }
    if (this._callback.addToFavorite) {
      this.setAddFavoritesHandler(this._callback.addToFavorite);
    }
    if (this._callback.addComment) {
      this._addComment(this._callback.addComment);
    }
  }

  _addTextAreaListener() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', (evt) => {
      if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
        if (evt.target.value.replace(/\s/g, '').length !== 0 || !this._state.emoji) {
          evt.target.disabled = true;
          this.getElement().querySelectorAll('input.film-details__emoji-item').forEach((element) => {
            element.disabled = true;
          });
          this.addComment();
        }
      }
    });
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', (evt) => {
      this._state.text = evt.target.value;
    });
  }

  _addEmojiListener() {
    this.getElement().querySelectorAll('input.film-details__emoji-item').forEach((element) => {
      element.addEventListener('change', (evt) => {
        this._state.emoji = evt.target.value;
        this.updateElement();
      });
    });
  }

  _addComment(callback) {
    this._callback.addComment = callback;
  }

  addComment() {
    this._callback.addComment(this._film, this._state);
  }

  _setDeleteHandler(evt) {
    evt.preventDefault();
    evt.target.innerHTML = 'Deleting';
    evt.target.disabled = true;
    const comment = this._comments.filter((com) => {
      return com.id === evt.target.dataset.id;
    })[0];
    this._callback.deleteComment(comment.id)
      .catch(() => {
        evt.target.innerHTML = 'Delete';
        evt.target.disabled = false;
      });
  }

  setDeleteHandler(callback) {
    this._callback.deleteComment = callback;
    if (this.getElement().querySelector('.film-details__comment-delete')) {
      this.getElement().querySelectorAll('.film-details__comment-delete').forEach((elem) =>
        elem.addEventListener('click', this._setDeleteHandler));
    }
  }

  errorComment() {
    this.getElement().querySelector('.film-details__comment-input').disabled = false;
    this.getElement().querySelectorAll('input.film-details__emoji-item').forEach((element) => {
      element.disabled = false;
    });
    this.getElement().querySelector('.film-details__new-comment').classList.add('shake');
    const timeout = setTimeout(() => {
      this.getElement().querySelector('.film-details__new-comment').classList.remove('shake');
      clearTimeout(timeout);
    }, SHAKE_TIME);
  }
}
