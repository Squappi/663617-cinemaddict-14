import dayjs from 'dayjs';
import Abstract from './view/abstract';

const MAP_RANK = new Map([
  [0, ''],
  [1, 'novice'],
  [11, 'fan'],
  [21, 'movie buff'],
]);

export const getUserRank = (filmCount) => {
  return Array.from(MAP_RANK.entries()).reverse().find(([count]) => filmCount >= count)[1];
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
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

  if (fimlA.rating < filmB.rating) {
    return 1;
  }

  return -1;
};

export const statsData = (watchDate, currentDate, period) => {
  switch (period) {
    case 'today':
      return dayjs.duration(dayjs(currentDate) - dayjs(watchDate), 'milliseconds').asDays() <= 1;
    case 'week':
      return dayjs.duration(dayjs(currentDate) - dayjs(watchDate), 'milliseconds').asWeeks() <= 1;
    case 'month':
      return dayjs.duration(dayjs(currentDate) - dayjs(watchDate), 'milliseconds').asMonths() <= 1;
    case 'year':
      return dayjs.duration(dayjs(currentDate) - dayjs(watchDate), 'milliseconds').asYears() <= 1;
    default :
      return true;
  }
};

