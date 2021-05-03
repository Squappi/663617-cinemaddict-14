import SiteCreateView from '../view/content.js';
import SiteCreatePopup from '../view/popup.js';
import {renderElement} from '../utils.js';

export default class popupPresenter {
  constructor(taskList) {
    this._taskList = taskList;

    this._task = null;
    this._popupTask = null;

    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleEscClosePopup = this._handleEscClosePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  init(task, position) {
    this._task = task;
    this._position = position;

    this._taskRender = new SiteCreateView(task);
    this._popupTask = new SiteCreatePopup(task);

    this._taskRender.setEditClickHandler(this._handleClosePopup);
    this._popupTask.setFormSubmitHandler(this._handleEscClosePopup);

    renderElement(this._taskList, this._taskRender.getElement(), position);
  }

  _handleClosePopup() {
    this._popupTask.getElement().remove();
    this._popupTask.removeElement();
    document.removeEventListener('keydown', this._handleEscClosePopup);
  }

  _handleEscClosePopup() {
    this._taskRender.setEditHandlerForm(() => {
      document.body.appendChild(this._popupTask.getElement());
      this._popupTask.setEditClickHandler(this._handleClosePopup);
      document.addEventListener('keydown', this._handleEscClosePopup);
    });
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }
}
