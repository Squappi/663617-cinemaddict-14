export default class FilterModel {
  constructor() {
    this._filter = 'AllMovies';
  }

  getFilter() {
    return this._filter;
  }

  setFilter(filter) {
    this._filter = filter;
  }
}
