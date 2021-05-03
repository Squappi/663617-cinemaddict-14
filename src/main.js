import SiteCreateNumberFilms from './view/number-of-films.js';
import { generateCard } from './mock/mock.js';
import { renderPosition, renderElement } from './utils.js';
import GenerateSite from './presenter/rendering-site.js';

const FILMS = 15;

const arrayFilms = new Array(FILMS).fill().map(generateCard);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const renderSiteElement = new GenerateSite(siteMainElement, siteHeaderElement);


renderSiteElement.init(arrayFilms);

renderElement(siteFooterElement, new SiteCreateNumberFilms(arrayFilms.length).getElement(), renderPosition.BEFOREEND);
