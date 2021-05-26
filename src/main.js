import GenerateSite from './presenter/rendering-site.js';
import Movies from './model/movies.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import StatsView from './view/stats.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic hS9sd7dfSwcl0sa3j';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const filmModel = new Movies();
const filterModel = new FilterModel();
const stats = new StatsView(filmModel);


const filterRender = new FilterPresenter(filmModel, siteMainElement, filterModel);
const renderSiteElement = new GenerateSite(siteMainElement, siteHeaderElement,siteFooterElement, filmModel, filterModel,stats,api);

filterRender.init();
renderSiteElement.init();

api.getMovies().then((films) => {
  filmModel.setTasks(films);
});

