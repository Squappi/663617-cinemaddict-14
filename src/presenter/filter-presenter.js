import {renderElement, RenderPosition} from '../utils';
import SiteMenuFilter from '../view/site-menu-filter';

export default class FilterPresenter {
  constructor(filmsModel, renderContainer, filterModel) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderingMarkup = renderContainer;

    this._addFilter = this._addFilter.bind(this);
    this._showStats = this._showStats.bind(this);

    this._handleTasksChange = this._handleTasksChange.bind(this);

    this._filmsModel.addObserver(this._handleTasksChange);
    this.loading = this.loading.bind(this);
    this._filmsModel.addObserver(this.loading);
  }

  loading() {
    this.init();
  }

  _handleTasksChange(evt) {
    if (evt === 'updateTasks') {
      this.init();
    }
  }

  init() {
    const oldFilterView = this._renderFilterView;
    this._renderFilterView = new SiteMenuFilter(this._filmsModel.getTasks(), this._filterModel.getFilter());

    if (oldFilterView) {
      const parentElement = oldFilterView.getElement().parentElement;
      parentElement.replaceChild(this._renderFilterView.getElement(), oldFilterView.getElement());
    } else {
      renderElement(this._renderingMarkup, this._renderFilterView.getElement(), RenderPosition.BEFOREEND);
    }

    this._renderFilterView.setFilterWatchlistHandler(this._addFilter);
    this._renderFilterView.setStatsHandler(this._showStats);
  }


  _addFilter(filter) {
    this._filterModel.setFilter(filter);
  }

  _showStats() {
    this._filterModel.showStats();
  }
}
