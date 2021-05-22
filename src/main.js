import SiteCreateNumberFilms from './view/number-of-films.js';
import { generateCard } from './mock/mock.js';
import { renderPosition, renderElement } from './utils.js';
import GenerateSite from './presenter/rendering-site.js';
import Movies from './model/movies.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import StatsView from './view/stats.js';


const FILMS = 15;

const arrayFilms = new Array(FILMS).fill().map(generateCard);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const taskModel = new Movies();
taskModel.setTasks(arrayFilms);
const filterModel = new FilterModel();
const stats = new StatsView(arrayFilms);


const filterRender = new FilterPresenter(taskModel, siteMainElement, filterModel);
const renderSiteElement = new GenerateSite(siteMainElement, siteHeaderElement, taskModel, filterModel,stats);

filterRender.init();
renderSiteElement.init();

renderElement(siteFooterElement, new SiteCreateNumberFilms(arrayFilms.length).getElement(), renderPosition.BEFOREEND);
