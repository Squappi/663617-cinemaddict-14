import dayjs from 'dayjs';
import Abstract from './view/utils-abstract';

export const renderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place = renderPosition.BEFOREEND) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const getWeightNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmsDate = (filmA, filmB) => {
  const weight = getWeightNullDate(filmA.year, filmB.year);
  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.year).diff(dayjs(filmA.year));
};

export const sortFilmsRating = (fimlA, filmB) => {
  if (fimlA.rating === filmB.rating) {
    return 0;
  }

  if (fimlA.rating > filmB.rating) {
    return 1;
  }

  return -1;
};

