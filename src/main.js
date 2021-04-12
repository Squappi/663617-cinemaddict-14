import { createFilterTemplete } from './view/site-menu.js';
import { createSortList } from './view/sort.js';
import { createContentList } from './view/content.js';
import { createButtonList } from './view/button.js';
import { createUserList } from './view/user.js';
import { createNumberOfFilms } from './view/number-of-films.js';
import { createContainerCards } from './view/cards-container.js';
import { createPopup } from './view/popup.js';
import { getFilter } from './mock/filter.js';

import { generateCard } from './mock/mock.js';

const FILMS = 15;
const FILMS_COUNT = 5;

const arrayFilms = new Array(FILMS).fill().map(generateCard);
const filter = getFilter(arrayFilms);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

render(siteMainElement, createFilterTemplete(filter), 'beforeend');
render(siteMainElement, createSortList(), 'beforeend');

const EXTRA = 2;

render(siteHeaderElement, createUserList(), 'beforeend');
render(siteMainElement, createContainerCards(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmsList = filmsElement.querySelector('.films-list');
const filmsContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(arrayFilms.length, FILMS_COUNT); i++) {
  render(filmsContainer, createContentList(arrayFilms[i]), 'beforeend');
}

let renderedFilmCount = FILMS_COUNT;
const getMoreFilms = (evt) => {
  evt.preventDefault();
  arrayFilms
    .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT)
    .forEach((task) => render(filmsContainer, createContentList(task), 'beforeend'));

  renderedFilmCount += FILMS_COUNT;

  evt.target.remove();
  if (renderedFilmCount < arrayFilms.length) {
    render(filmsContainer, createButtonList(), 'beforeend');
    const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');

    loadMoreButton.addEventListener('click', getMoreFilms);
  }
};

if (arrayFilms.length > FILMS_COUNT) {
  render(filmsContainer, createButtonList(), 'beforeend');

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', getMoreFilms);
}

const [topRateOne,mostCommented] = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < EXTRA; i ++) {
  render(topRateOne, createContentList(arrayFilms[i]), 'beforeend');
}

for (let i = 0; i < EXTRA; i ++) {
  render(mostCommented, createContentList(arrayFilms[i]), 'beforeend');
}

render(siteFooterElement, createNumberOfFilms(), 'beforeend');

const bodyElements = document.querySelector('body');

render(bodyElements, createPopup(arrayFilms[0]), 'beforeend');
