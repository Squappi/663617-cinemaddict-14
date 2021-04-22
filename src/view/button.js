import Abstract from './utils-abstract';

const createButtonList = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class SiteMenuSort extends Abstract{
  constructor() {
    super();
    this._element = null;

    this._editClickButton = this._editClickButton.bind(this);
  }
  getTemplate() {
    return createButtonList();
  }

  _editClickButton(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setClickbutton(callback) {
    this._callback.editClick = callback;
    this.getElement().addEventListener('click', this._editClickButton);
  }
}
