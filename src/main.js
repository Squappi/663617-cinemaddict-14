import SiteMenuSort from './view/sort.js';
import  SiteCreateView  from './view/content.js';
import  SiteButton  from './view/button.js';
import SiteMenuUser  from './view/user.js';
import SiteCreateNumberFilms from './view/number-of-films.js';
import  SiteCreateCards from './view/cards-container.js';
import  SiteCreatePopup  from './view/popup.js';
import SiteMenuFilter  from './mock/filter.js';
import EmptyMessage from './view/empty.js';

import { generateCard } from './mock/mock.js';
import { renderPosition, renderElement } from './utils.js';

const FILMS = 15;
const FILMS_COUNT = 5;

const arrayFilms = new Array(FILMS).fill().map(generateCard);
const filter = new SiteMenuFilter(arrayFilms);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

renderElement(siteMainElement, filter.getElement(), renderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuSort().getElement(), renderPosition.BEFOREEND);

const EXTRA = 2;

renderElement(siteHeaderElement,new SiteMenuUser().getElement(), renderPosition.BEFOREEND);
renderElement(siteMainElement,new SiteCreateCards().getElement(), renderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector('.films');
const filmsList = filmsElement.querySelector('.films-list');
const filmsContainer = filmsList.querySelector('.films-list__container');


const renderTask = (positionElement ,taskForRender, position) => {
  const task = new SiteCreateView(taskForRender);
  const popupTask = new SiteCreatePopup(taskForRender);

  const closePopup = () => {
    popupTask.getElement().remove();
    popupTask.removeElement();
    document.removeEventListener('keydown', closeEscPopup);
  };

  const closeEscPopup = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };
  task.setEditHandlerForm(() => {
    document.body.appendChild(popupTask.getElement());
    popupTask.setEditClickHandler(closePopup);
    document.addEventListener('keydown', closeEscPopup);
  });

  renderElement(positionElement,task.getElement(), position);
};

for (let i = 0; i < Math.min(arrayFilms.length, FILMS_COUNT); i++) {
  renderTask(filmsContainer, arrayFilms[i], renderPosition.BEFOREEND);

}

const [topRateOne,mostCommented] = filmsElement.querySelectorAll('.films-list--extra .films-list__container');
if(arrayFilms.length >= 2) {
  for (let i = 0; i < EXTRA; i ++) {
    renderTask(topRateOne,arrayFilms[i], renderPosition.BEFOREEND);
  }

  for (let i = 0; i < EXTRA; i ++) {
    renderTask(mostCommented,arrayFilms[i], renderPosition.BEFOREEND);
  }
}

if(arrayFilms.length === 0) {
  renderElement(filmsList, new EmptyMessage().getElement(), renderPosition.BEFOREEND);
}

let renderedFilmCount = FILMS_COUNT;
if (arrayFilms.length > FILMS_COUNT) {
  const loadMoreButton = new SiteButton();
  renderElement(filmsList, loadMoreButton.getElement(), renderPosition.BEFOREEND);


  loadMoreButton.setClickbutton(() => {
    arrayFilms
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT)
      .forEach((task) => renderTask(filmsContainer,task, renderPosition.BEFOREEND));
    renderedFilmCount += FILMS_COUNT;
    if (renderedFilmCount >= arrayFilms.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
}

renderElement(siteFooterElement, new SiteCreateNumberFilms(arrayFilms.length).getElement(), renderPosition.BEFOREEND);
