import { createSiteMenu } from './view/site-menu.js';
import { createSortList } from './view/sort.js';
import { createContentList } from './view/content.js';
import { createButtonList } from './view/button.js';
import { createUserList } from './view/user.js';
import { createNumberOfFilms } from './view/number-of-films.js';
import { createContainerCards } from './view/cards-container.js';
import { createPopup } from './view/popup.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

render(siteMainElement, createSiteMenu(), 'beforeend');
render(siteMainElement, createSortList(), 'beforeend');

const TASK_LIST = 5;
const EXTRA = 2;

render(siteHeaderElement, createUserList(), 'beforeend');
render(siteMainElement, createContainerCards(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmsList = filmsElement.querySelector('.films-list');
const filmsContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < TASK_LIST; i++) {
  render(filmsContainer, createContentList(), 'beforeend');
}

const topRateElements = filmsElement.querySelectorAll('.films-list--extra');
const topRateOne = topRateElements[0].querySelector('.films-list__container');
const mostCommented = topRateElements[1].querySelector('.films-list__container');

for (let i = 0; i < EXTRA; i ++) {
  render(topRateOne, createContentList(), 'beforeend');
}

for (let i = 0; i < EXTRA; i ++) {
  render(mostCommented, createContentList(), 'beforeend');
}

render(siteMainElement, createButtonList(), 'beforeend');
render(siteFooterElement, createNumberOfFilms(), 'beforeend');

const bodyElements = document.querySelector('body');

render(bodyElements, createPopup(), 'beforeend');
