import SiteMenuSort from '../view/sort.js';
import  SiteCreateView  from '../view/content.js';
import  SiteButton  from '../view/button.js';
import SiteMenuUser  from '../view/user.js';
import SiteCreateNumberFilms from '../view/number-of-films.js';
import  SiteCreateCards from '../view/cards-container.js';
import  SiteCreatePopup  from '../view/popup.js';
import SiteMenuFilter  from '../mock/filter.js';
import EmptyMessage from '../view/empty.js';
import { remove, renderElement, renderPosition } from '../utils.js';


const FILMS_COUNT = 5;
const EXTRA = 2;

export default class renderingSite {
  constructor(renderContainer, renderHeader) {
    this._renderingMarkup = renderContainer;
    this._renderingHeader = renderHeader;
    this._renderFilmsCount = FILMS_COUNT;

    this._renderingSortMenu = new SiteMenuSort();
    this._renderComponentView = new SiteCreateView();
    this._renderButton = new SiteButton();
    this._renderUserView = new SiteMenuUser();
    this._rendreNumderFilms = new SiteCreateNumberFilms();
    this._renderContainerCards = new SiteCreateCards();
    this._renderPopupView = new SiteCreatePopup();
    this._renderFilterView = new SiteMenuFilter();
    this._renderEmptyMessage = new EmptyMessage();

    this._editClickButton = this._editClickButton.bind(this);
  }

  init(renderSite) {
    this._renderSite = renderSite.slice();

    this._renderFitter(this._renderSite);
    this._renderSort();
    this._renderUser();

    renderElement(this._renderingMarkup, this._renderContainerCards.getElement(), renderPosition.BEFOREEND);
    this._filmsList = this._renderingMarkup.querySelector('.films-list');
    this._renderFilmsList = this._renderingMarkup.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(this._renderSite.length, FILMS_COUNT); i++) {
      this._renderComponent(this._renderFilmsList, this._renderSite[i], renderPosition.BEFOREEND);
    }

    [this._topRateOne,this._mostCommented] = this._renderingMarkup.querySelectorAll('.films-list--extra .films-list__container');

    if(this._renderSite.length >= 2) {
      for (let i = 0; i < EXTRA; i ++) {
        this._renderComponent(this._topRateOne,this._renderSite[i], renderPosition.BEFOREEND);
      }

      for (let i = 0; i < EXTRA; i ++) {
        this._renderComponent(this._mostCommented,this._renderSite[i], renderPosition.BEFOREEND);
      }
    }

    this._renderLoadMoreButton();

    if(this._renderSite.length === 0) {
      this._renderMessage();
    }

    this._renderNumderFilm();
  }

  _renderFitter(filter) {
    renderElement(this._renderingMarkup,this._renderFilterView.getElement(), renderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._renderingMarkup,this._renderingSortMenu.getElement(), renderPosition.BEFOREEND);
  }

  _renderUser() {
    renderElement(this._renderingHeader, this._renderUserView.getElement(),renderPosition.BEFOREEND);
  }

  // BUTTON RENDERING

  _renderContainerTasks(from, to) {
    this._renderingMarkup
      .slice(from, to)
      .forEach((containerTasks) => this._renderContainerTasks(containerTasks));
  }

  _handleLoadMoreButtonClick() {
    this._renderContainerTasks(this._renderFilmsCount, this._renderFilmsCount + FILMS_COUNT);
    this._renderFilmsCount += FILMS_COUNT;

    if(this._renderFilmsCount >= this._renderSite.length) {
      remove(this._renderButton);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._filmsList, this._renderButton, renderPosition.BEFOREEND);

    this._renderButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderComponent(positionElementMenu ,taskForRender, position) {
    const task = new SiteCreateView(taskForRender);
    const popupTask = new SiteCreatePopup(taskForRender);

    const closePopup = () => {
      popupTask.getElement().remove();
      popupTask.removeElement();
      document.removeEventListener('keydown', closeEscPopup);
    };

    const closeEscPopup = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup();
      }
    };
    task.setEditHandlerForm(() => {
      document.body.appendChild(popupTask.getElement());
      popupTask.setEditClickHandler(closePopup);
      document.addEventListener('keydown', closeEscPopup);
    });

    renderElement(positionElementMenu, task.getElement(), position);
  }

  _renderNumderFilm() {
    renderElement(this._renderingMarkup, this._rendreNumderFilms, renderPosition.BEFOREEND);
  }

  _renderMessage() {
    renderElement(this._renderingMarkup, this._renderEmptyMessage, renderPosition.BEFOREEND);
  }
}
