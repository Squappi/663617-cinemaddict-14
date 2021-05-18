import Observer from '../observer';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._filter = 'AllMovies';
  }

  getFilter() {
    return this._filter;
  }

  setFilter(filter) {
    this._filter = filter;
    this._notify('change', filter);
  }
}
