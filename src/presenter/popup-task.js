import SiteCreateView from '../view/content.js';
import SiteCreatePopup from '../view/popup.js';
import {renderElement} from '../utils.js';

export default class popupTask {
  constructor(taskList, changeData) {
    this._taskList = taskList;
    this._changeData = changeData;

    this._task = null;
    this._popupTask = null;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupEsc = this._handleClosePopupEsc.bind(this);

  }

  init(task) {
    this._task = task;

    let previousTaskRender = null;
    if (this._taskRender) {
      previousTaskRender = this._taskRender;
    }

    this._taskRender = new SiteCreateView(task);
    this._popupTask = new SiteCreatePopup(task);

    this._taskRender.setEditHandlerForm(this._handleOpenPopup);

    this._popupTask.setEditClickHandler(this._handleClosePopup);

    if (previousTaskRender) {
      this._taskList.replaceChild(this._taskRender.getElement(), previousTaskRender.getElement());
    } else {
      renderElement(this._taskList, this._taskRender.getElement());
    }
  }

  _handleClosePopupEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }

  _handleClosePopup() {
    this._popupTask.getElement().remove();
    this._popupTask.removeElement();
    document.removeEventListener('keydown', this._handleClosePopupEsc);
  }

  _handleOpenPopup() {
    document.body.appendChild(this._popupTask.getElement());
    this._popupTask.setEditClickHandler(this._handleClosePopup);
    document.addEventListener('keydown', this._handleClosePopupEsc);
  }
}
