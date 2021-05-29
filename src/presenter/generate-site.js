import SiteMenuSort from '../view/site-menu-sort.js';
import SiteButton from '../view/site-button.js';
import SiteMenuUser from '../view/site-menu-user.js';
import SiteCreateNumberFilms from '../view/site-create-number-films.js';
import SiteCreateContainer from '../view/site-create-container.js';
import EmptyMessage from '../view/empty-message.js';

import PopupPresenter from './popup-presenter.js';
import {remove, renderElement, RenderPosition, sortFilmsDate, sortFilmsRating} from '../utils.js';
import {SortType} from '../mock/const.js';
import LoadingMessage from '../view/loading-message.js';

const FILMS_COUNT = 5;
const EXTRA = 2;

export default class GenerateSite {
  constructor(renderContainer, renderHeader, renderFooter, filmsModel, filterModel, stats, api) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._stats = stats;
    this._api = api;
    this._renderingMarkup = renderContainer;
    this._renderingHeader = renderHeader;
    this._renderFooter = renderFooter;
    this._renderFilmsCount = FILMS_COUNT;

    this._renderingSortMenu = new SiteMenuSort();

    this._renderButton = new SiteButton();
    this._renderUserView = new SiteMenuUser(this._filmsModel.getTasks());
    this._renderContainerCards = new SiteCreateContainer();
    this._renderEmptyMessage = new EmptyMessage();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._changeData = this._changeData.bind(this);
    this._changeMode = this._changeMode.bind(this);

    this._mapMain = new Map();
    this._mapTopRate = new Map();
    this._mapTopComment = new Map();

    this._sortByData = this._sortByData.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);

    this._filterModel.addObserver(this._handleChangeFilter);
    this._showHideStats = this._showHideStats.bind(this);
    this._filterModel.addObserver(this._showHideStats);
    this.loading = this.loading.bind(this);
    this._filmsModel.addObserver(this.loading);
  }

  loading(evt) {
    if (evt === 'setFilms') {
      this.renderCards();
    }
    this._renderUserView.updateFilms(this._filmsModel.getTasks());
  }

  _handleChangeFilter(_event, filter, film) {
    if (_event !== 'changeFilter' && _event !== 'addToList') {
      return;
    }
    if (_event === 'changeFilter') {
      this._mapMain.clear();
      this._renderFilmsCount = FILMS_COUNT;
      this._renderSite = this._filmsModel.getTasks(filter).slice();
      this._sourcedFilms = this._filmsModel.getTasks(filter).slice();
    }

    if (_event === 'addToList') {
      if (!this._filmsModel.getTasks(filter).find((filterFilm) => filterFilm.id === film.id)) {
        this._mapMain.delete(film.id);
      }
    }

    this._renderFilmsList.innerHTML = '';

    this._renderContainerTasks(0, Math.min(this._renderSite.length, this._renderFilmsCount));

    this._renderLoadMoreButton();
    if (this._renderSite.length === 0) {
      this._renderingSortMenu.getElement().remove();
    } else {
      this._renderSort();
      this._renderingSortMenu.clear();
    }
  }

  init() {
    this._renderSite = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();
    this._sourcedFilms = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();

    renderElement(this._renderingHeader, this._renderUserView.getElement(), RenderPosition.BEFOREEND);

    if (this._filmsModel.isLoading()) {
      renderElement(this._renderingMarkup, this._renderContainerCards.getElement(), RenderPosition.BEFOREEND);
      this._filmsList = this._renderingMarkup.querySelector('.films-list');
      this._renderFilmsList = this._renderingMarkup.querySelector('.films-list__container');
      renderElement(this._renderFilmsList, new LoadingMessage().getElement(), RenderPosition.BEFOREEND);
    } else {
      this.renderCards();
    }
  }

  renderCards() {
    this._renderSite = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();
    this._sourcedFilms = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();
    this._renderFilmsList.innerHTML = '';
    this._renderNumderFilms = new SiteCreateNumberFilms(this._renderSite);

    // render Cards
    if (this._renderSite.length === 0) {
      this._renderMessage();
    } else {
      renderElement(this._renderingMarkup, this._renderContainerCards.getElement(), RenderPosition.BEFOREEND);
      this._filmSection = this._renderingMarkup.querySelector('.films');
      this._renderSort();
      this._filmsList = this._renderingMarkup.querySelector('.films-list');
      this._renderFilmsList = this._renderingMarkup.querySelector('.films-list__container');
      this._renderContainerTasks(0, Math.min(this._renderSite.length, FILMS_COUNT));

      [this._topRateOne, this._mostCommented] = this._renderingMarkup.querySelectorAll('.films-list--extra .films-list__container');

      if (this._renderSite.length >= EXTRA) {
        for (let i = 0; i < EXTRA; i++) {
          this._mapTopRate.set(this._renderSite[i].id, this._renderComponent(this._topRateOne, this._renderSite[i], RenderPosition.BEFOREEND));
        }

        for (let i = 0; i < EXTRA; i++) {
          this._mapTopComment.set(this._renderSite[i].id, this._renderComponent(this._mostCommented, this._renderSite[i], RenderPosition.BEFOREEND));
        }
      }
      this._renderLoadMoreButton();
    }
    renderElement(this._renderingMarkup, this._stats.getElement(), RenderPosition.BEFOREEND);

    this._renderNumberFilm();

  }

  _showHideStats(evt) {
    switch (evt) {
      case 'showStats':
        this._showStats();
        break;
      case 'showFilms':
        this._showFilms();
        break;
      default:
        break;
    }
  }

  _changeMode() {
    for (const presenter of this._mapMain.values()) {
      presenter.resetView();
    }
    //обход всех остальных popup presenters и вызов resetView
  }

  _changeData(film) {
    //+update film in this._renderSite

    this._api.updateMovie(film)
      .then((responseFilm) => {
        this._filmsModel.updateFilm(responseFilm);

        this._renderSite = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();
        this._sourcedFilms = this._filmsModel.getTasks(this._filterModel.getFilter()).slice();
        this._handleChangeFilter('addToList', this._filterModel.getFilter(), responseFilm);

        if (this._mapMain.has(responseFilm.id)) {
          this._mapMain.get(responseFilm.id).init(responseFilm);
        }

        if (this._mapTopComment.has(responseFilm.id)) {
          this._mapTopComment.get(responseFilm.id).init(responseFilm);
        }

        if (this._mapTopRate.has(responseFilm.id)) {
          this._mapTopRate.get(responseFilm.id).init(responseFilm);
        }
      });
  }

  _sortByData(sortType) {
    this._renderSite = this._sourcedFilms.slice();
    switch (sortType) {
      case SortType.DATE:
        this._renderSite.sort(sortFilmsDate);
        break;
      case SortType.RATING:
        this._renderSite.sort(sortFilmsRating);
        break;
      case SortType.DEFAULT:
        break;
    }
    this._renderFilmsCount = FILMS_COUNT;

    this._renderFilmsList.innerHTML = '';
    this._mapMain.clear();
    this._renderContainerTasks(0, Math.min(this._renderSite.length, FILMS_COUNT));
  }

  _renderSort() {
    renderElement(this._filmSection, this._renderingSortMenu.getElement(), RenderPosition.AFTERBEGIN);
    this._renderingSortMenu.sortTypeChangeHandler(this._sortByData);
  }

  // BUTTON RENDERING

  _renderContainerTasks(from, to) {
    if (this._renderSite.length === 0) {
      this._renderMessage();
    } else {
      this._renderSite
        .slice(from, to)
        .forEach((film) => {
          const currentFilmComponent = this._mapMain.get(film.id);
          if (currentFilmComponent) {
            currentFilmComponent.init(film);
          } else {
            this._mapMain.set(film.id, this._renderComponent(this._renderFilmsList, film, RenderPosition.BEFOREEND));
          }
        });
    }
  }

  _handleLoadMoreButtonClick() {
    this._renderContainerTasks(this._renderFilmsCount, this._renderFilmsCount + FILMS_COUNT);
    this._renderFilmsCount += FILMS_COUNT;

    if (this._renderFilmsCount >= this._renderSite.length) {
      remove(this._renderButton);
    }
  }

  _renderLoadMoreButton() {
    if (this._renderFilmsCount < this._sourcedFilms.length) {
      renderElement(this._filmsList, this._renderButton.getElement(), RenderPosition.BEFOREEND);
      this._renderButton.setClickHandler(this._handleLoadMoreButtonClick);
    } else {
      remove(this._renderButton);
    }
  }

  _renderComponent(positionElementMenu, filmForRender) {
    const popupTaskPresenter = new PopupPresenter(positionElementMenu, this._changeData, this._changeMode, this._api);
    popupTaskPresenter.init(filmForRender);
    return popupTaskPresenter;
  }

  _renderNumberFilm() {
    renderElement(this._renderFooter, this._renderNumderFilms.getElement(), RenderPosition.BEFOREEND);
  }

  _renderMessage() {
    renderElement(this._renderFilmsList, this._renderEmptyMessage.getElement(), RenderPosition.AFTERBEGIN);
  }

  _showStats() {
    this._stats.show();
    this._renderContainerCards.hide();
  }

  _showFilms() {
    this._stats.hide();
    this._renderContainerCards.show();
  }
}
