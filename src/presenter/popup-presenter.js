import SiteCreateView from '../view/site-create-view.js';
import SiteCreatePopup from '../view/site-create-popup.js';
import {renderElement} from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PopupPresenter {
  constructor(filmList, changeData, changeMode, api) {
    this._filmList = filmList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._film = null;
    this._popupFilm = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupEsc = this._handleClosePopupEsc.bind(this);

    this._addToWatch = this._addToWatch.bind(this);
    this._addToHistory = this._addToHistory.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
  }

  _addToWatch() {
    const film = Object.assign(
      {},
      this._film,
      {
        allMovies: Object.assign(
          {},
          this._film.allMovies,
          {
            watchList: !this._film.allMovies.watchList,
          },
        ),
      },
    );
    this._changeData(film);
  }

  _addToHistory() {
    const film = Object.assign(
      {},
      this._film,
      {
        allMovies: Object.assign(
          {},
          this._film.allMovies,
          {
            history: !this._film.allMovies.history,
            watchDate: this._film.allMovies.history ? null : new Date(),
          },
        ),
      },
    );
    this._changeData(film);
  }

  _addToFavorite() {
    const film = Object.assign(
      {},
      this._film,
      {
        allMovies: Object.assign(
          {},
          this._film.allMovies,
          {
            favorites: !this._film.allMovies.favorites,
          },
        ),
      },
    );
    this._changeData(film);
  }

  _deleteComment(deleteComment) {
    const film = Object.assign(
      {},
      this._film,
      {
        comments: this._film.comments.filter((comment) => {
          return comment !== deleteComment;
        }),
      },
    );
    return this._api.deleteComment(deleteComment).then(() => {
      this.init(film);
    });
  }

  init(film) {
    this._film = film;

    let previousFilmRender = null;
    if (this._filmRender) {
      previousFilmRender = this._filmRender;
    }

    let previousPopup = null;
    if (this._popupFilm) {
      previousPopup = this._popupFilm;
    }

    this._filmRender = new SiteCreateView(film);
    this._filmRender.setEditHandlerForm(this._handleOpenPopup);
    this._filmRender.setToWatchList(this._addToWatch);
    this._filmRender.setToHistoryList(this._addToHistory);
    this._filmRender.setToFavoriteList(this._addToFavorite);

    this._popupFilm = new SiteCreatePopup(film, this._api);

    this._popupFilm.setAddToWatchListHandler(this._addToWatch);
    this._popupFilm.setAddToHistoryHandler(this._addToHistory);
    this._popupFilm.setAddFavoritesHandler(this._addToFavorite);
    this._popupFilm.setDeleteHandler(this._deleteComment);
    this._popupFilm.setCloseHandler(this._handleClosePopup);

    this._popupFilm._addComment((film, comment) => {
      return this._api.addComment(film, comment)
        .then((responseFilm) => {
          this._popupFilm.clearTextArea();
          this._changeData(responseFilm);
        }).catch(() => {
          this._popupFilm.errorComment();
        });
    });

    if (previousFilmRender && this._filmList.contains(previousFilmRender.getElement())) {
      this._filmList.replaceChild(this._filmRender.getElement(), previousFilmRender.getElement());
    } else {
      renderElement(this._filmList, this._filmRender.getElement());
    }


    if (this._mode === Mode.EDITING) {
      if (previousPopup && document.body.contains(previousPopup.getElement())) {
        document.body.replaceChild(this._popupFilm.getElement(), previousPopup.getElement());
        this._loadComments();
      } else {
        this._handleOpenPopup();
      }
    }
  }

  _loadComments() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._popupFilm.setComments(comments);
      });
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._handleClosePopup();
    }
  }

  _handleClosePopupEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }

  _handleClosePopup() {
    this._popupFilm.getElement().remove();
    document.removeEventListener('keydown', this._handleClosePopupEsc);
    document.body.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
  }

  _handleOpenPopup() {
    this._loadComments();
    this._changeMode();
    document.body.appendChild(this._popupFilm.getElement());
    document.addEventListener('keydown', this._handleClosePopupEsc);
    document.body.classList.add('hide-overflow');
    this._mode = Mode.EDITING;
  }
}
