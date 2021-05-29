import { SortType } from '../mock/const.js';
import Abstract from './abstract.js';

const createSortList = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;
};

export default class SiteMenuSort extends Abstract{
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortList(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    if(evt.target.tagName !== 'A') {
      return;
    }

    if(evt.target.classList.contains('sort__button--active')) {
      return;
    }

    evt.preventDefault();
    this._callback.SortTypeChange(evt.target.dataset.sortType);

    this.getElement().querySelectorAll('.sort__button').forEach((button) => {
      button.classList.remove('sort__button--active');
    });
    evt.target.classList.add('sort__button--active');
  }

  clear() {
    this.getElement().querySelectorAll('.sort__button').forEach((button) => {
      button.classList.remove('sort__button--active');
    });
    this.getElement().querySelectorAll('.sort__button')[0].classList.add('sort__button--active');
  }

  sortTypeChangeHandler(callback) {
    this._callback.SortTypeChange = callback;
    this.getElement().querySelectorAll('.sort__button').forEach((element) => {
      element.addEventListener('click', this._sortTypeChangeHandler);
    });
  }

}
