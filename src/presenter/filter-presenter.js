import SiteMenuFilter from '../mock/filter';
import { renderElement, renderPosition } from '../utils';

export default class FilterPresenter {
  constructor(tasksModel, renderContainer, filterModel) {
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;
    this._renderingMarkup = renderContainer;

    this._addFilter = this._addFilter.bind(this);
  }

  init() {
    this._renderFilterView = new SiteMenuFilter(this._tasksModel.getTasks(this._filterModel.getFilter()));
    this._renderFitter();

    this._renderFilterView.setFilterWatchlistHandler(this._addFilter);
  }

  _renderFitter() {
    renderElement(this._renderingMarkup, this._renderFilterView.getElement(), renderPosition.BEFOREEND);
  }

  _addFilter(filter) {
    this._filterModel.setFilter(filter);
  }
}
