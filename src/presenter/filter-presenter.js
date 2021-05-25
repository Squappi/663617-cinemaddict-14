import SiteMenuFilter from '../mock/filter';
import {renderElement, renderPosition} from '../utils';

export default class FilterPresenter {
  constructor(tasksModel, renderContainer, filterModel) {
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;
    this._renderingMarkup = renderContainer;

    this._addFilter = this._addFilter.bind(this);
    this._showStats = this._showStats.bind(this);

    this._handleTasksChange = this._handleTasksChange.bind(this);

    this._tasksModel.addObserver(this._handleTasksChange);
  }

  _handleTasksChange(evt) {
    if (evt === 'updateTasks') {
      this.init();
    }
  }

  init() {
    const oldFilterView = this._renderFilterView;
    this._renderFilterView = new SiteMenuFilter(this._tasksModel.getTasks(this._filterModel.getFilter()));

    if (oldFilterView) {
      const parentElement = oldFilterView.getElement().parentElement;
      parentElement.replaceChild(this._renderFilterView.getElement(), oldFilterView.getElement());
    } else {
      renderElement(this._renderingMarkup, this._renderFilterView.getElement(), renderPosition.BEFOREEND);
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
