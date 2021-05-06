import SiteCreateView from '../view/content.js';
import SiteCreatePopup from '../view/popup.js';
import {renderElement} from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class popupPresenter {
  constructor(taskList, changeData, changeMode) {
    this._taskList = taskList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._task = null;
    this._popupTask = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupEsc = this._handleClosePopupEsc.bind(this);
    this._addToWatch = this._addToWatch.bind(this);
  }

  _addToWatch() {
    const task = Object.assign(
      {},
      this._task,
      {
        allMovies: Object.assign(
          {},
          this._task.allMovies,
          {
            watchList: !this._task.allMovies.watchList,
          },
        ),
      },
    );
    //this._task.allMovies.watchList= !this._task.allMovies.watchList,
    this._changeData(task);
  }

  init(task) {
    this._task = task;

    let previousTaskRender = null;
    if (this._taskRender) {
      previousTaskRender = this._taskRender;
    }

    let previousPopup = null;
    if (this._popupTask) {
      previousPopup = this._popupTask;
    }

    this._taskRender = new SiteCreateView(task);
    this._taskRender.setEditHandlerForm(this._handleOpenPopup);

    this._popupTask = new SiteCreatePopup(task);

    this._popupTask.setAddToWatchListHandler(this._addToWatch);
    this._popupTask.setCloseHandler(this._handleClosePopup);

    if (previousTaskRender) {
      this._taskList.replaceChild(this._taskRender.getElement(), previousTaskRender.getElement());
    } else {
      renderElement(this._taskList, this._taskRender.getElement());
    }


    if (this._mode === Mode.EDITING) {
      if (previousPopup) {
        document.body.replaceChild(this._popupTask.getElement(), previousPopup.getElement());
      } else {
        this._handleOpenPopup();
      }
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._handleClosePopup();
    }
    //
    // this._popupTask.setEditClickHandler(this._handleClosePopup);
    //
    // if (previousTaskRender) {
    //   this._taskList.replaceChild(this._taskRender.getElement(), previousTaskRender.getElement());
    // } else {
    //   renderElement(this._taskList, this._taskRender.getElement());
    // }
  }

  _handleClosePopupEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }

  _handleClosePopup() {
    this._popupTask.getElement().remove();
    document.removeEventListener('keydown', this._handleClosePopupEsc);
  }

  _handleOpenPopup() {
    this._changeMode();
    document.body.appendChild(this._popupTask.getElement());
    document.addEventListener('keydown', this._handleClosePopupEsc);
    this._mode = Mode.EDITING;
  }
}
