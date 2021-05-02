import SiteCreateNumberFilms from './view/number-of-films.js';
import SiteMenuFilter  from './mock/filter.js';
import { generateCard } from './mock/mock.js';
import { renderPosition, renderElement } from './utils.js';
import renderingSite from './presenter/rendering-site.js';

const FILMS = 15;

const arrayFilms = new Array(FILMS).fill().map(generateCard);
const filter = new SiteMenuFilter(arrayFilms);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const renderSiteElement = new renderingSite(siteMainElement, siteHeaderElement);


renderSiteElement.init(arrayFilms);

renderElement(siteFooterElement, new SiteCreateNumberFilms(arrayFilms.length).getElement(), renderPosition.BEFOREEND);
