import SiteMenuSort from '../view/sort.js';
import SiteCreateView from '../view/content.js';
import SiteButton from '../view/button.js';
import SiteMenuUser from '../view/user.js';
import SiteCreateNumberFilms from '../view/number-of-films.js';
import SiteCreateCards from '../view/cards-container.js';
import SiteCreatePopup from '../view/popup.js';
import SiteMenuFilter from '../mock/filter.js';
import EmptyMessage from '../view/empty.js';

import popupPresenter from './popup-task.js';
import {remove, renderElement, renderPosition} from '../utils.js';


const FILMS_COUNT = 5;
const EXTRA = 2;

export default class GenerateSite {
  constructor(renderContainer, renderHeader) {
    this._renderingMarkup = renderContainer;
    this._renderingHeader = renderHeader;
    this._renderFilmsCount = FILMS_COUNT;

    this._renderingSortMenu = new SiteMenuSort();
    //this._renderComponentView = new SiteCreateView();
    this._renderButton = new SiteButton();
    this._renderUserView = new SiteMenuUser();

    this._renderContainerCards = new SiteCreateCards();
    //this._renderPopupView = new SiteCreatePopup();
    this._renderEmptyMessage = new EmptyMessage();

    //this._task = null;
    //this._popupTask = null;

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._changeData = this._changeData.bind(this);

    this._mapMain = new Map();
    this._mapTopRate = new Map();
    this._mapTopComment = new Map();
  }

  init(films) {
    this._renderSite = films.slice();
    this._renderNumderFilms = new SiteCreateNumberFilms(this._renderSite);
    this._renderFilterView = new SiteMenuFilter(this._renderSite);

    this._renderFitter();
    this._renderSort();
    this._renderUser();

    // render ContainerCards

    renderElement(this._renderingMarkup, this._renderContainerCards.getElement(), renderPosition.BEFOREEND);
    this._filmsList = this._renderingMarkup.querySelector('.films-list');
    this._renderFilmsList = this._renderingMarkup.querySelector('.films-list__container');

    // render Cards

    for (let i = 0; i < Math.min(this._renderSite.length, FILMS_COUNT); i++) {
      this._mapMain.set(this._renderSite[i].id, this._renderComponent(this._renderFilmsList, this._renderSite[i], renderPosition.BEFOREEND));
    }

    [this._topRateOne, this._mostCommented] = this._renderingMarkup.querySelectorAll('.films-list--extra .films-list__container');

    if (this._renderSite.length >= 2) {
      for (let i = 0; i < EXTRA; i++) {
        this._mapTopRate.set(this._renderSite[i].id, this._renderComponent(this._topRateOne, this._renderSite[i], renderPosition.BEFOREEND))
      }

      for (let i = 0; i < EXTRA; i++) {
        this._mapTopComment.set(this._renderSite[i].id, this._renderComponent(this._mostCommented, this._renderSite[i], renderPosition.BEFOREEND))
      }
    }

    this._renderLoadMoreButton();

    if (this._renderSite.length === 0) {
      this._renderMessage();
    }

    this._renderNumderFilm();
  }

  _changeData(task) {
    //+update task in this._renderSite
    if (this._mapMain.has(task.id)) {
      this._mapMain.get(task.id).init(task);
    }

    if (this._mapTopComment.has(task.id)) {
      this._mapTopComment.get(task.id).init(task);
    }

    if (this._mapTopRate.has(task.id)) {
      this._mapTopRate.get(task.id).init(task);
    }
  }

  _renderFitter() {
    renderElement(this._renderingMarkup, this._renderFilterView.getElement(), renderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._renderingMarkup, this._renderingSortMenu.getElement(), renderPosition.BEFOREEND);
  }

  _renderUser() {
    renderElement(this._renderingHeader, this._renderUserView.getElement(), renderPosition.BEFOREEND);
  }

  // BUTTON RENDERING

  _renderContainerTasks(from, to) {
    this._renderSite
      .slice(from, to)
      .forEach((film) => {
        this._mapMain.set(film.id, this._renderComponent(this._renderFilmsList, film, renderPosition.BEFOREEND));
      });
  }

  _handleLoadMoreButtonClick() {
    this._renderContainerTasks(this._renderFilmsCount, this._renderFilmsCount + FILMS_COUNT);
    this._renderFilmsCount += FILMS_COUNT;

    if (this._renderFilmsCount >= this._renderSite.length) {
      remove(this._renderButton);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._filmsList, this._renderButton.getElement(), renderPosition.BEFOREEND);

    this._renderButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderComponent(positionElementMenu, taskForRender) {
    const popupTaskPresenter = new popupPresenter(positionElementMenu, this._changeData);
    popupTaskPresenter.init(taskForRender);
    return popupTaskPresenter;
  }

  _renderNumderFilm() {
    renderElement(this._renderingMarkup, this._renderNumderFilms.getElement(), renderPosition.BEFOREEND);
  }

  _renderMessage() {
    renderElement(this._renderingMarkup, this._renderEmptyMessage.getElement(), renderPosition.BEFOREEND);
  }
}
