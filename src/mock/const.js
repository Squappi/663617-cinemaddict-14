import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const AUTHORS = [
  'Виталий',
  'Арсений',
  'Владислав',
  'Эльвира',
  'Григорий',
  'Вячеслав',
];

const YEARS = [
  '1955',
  '1937',
  '1940',
  '1925',
];

const GENRES = [
  'Drama',
  'Mystery',
  'Comedy',
  'Musical',
  'Western',
  'Cartoon',
];

const EMOJIES = [
  'angry.png',
  'puke.png',
  'sleeping.png',
  'smile.png',
];

const NAME_FILMS = [
  'The Man with the Golden Arm',
  'Made for Each Other',
  'Santa Claus Conquers the Martians',
  'The Great Flamarion',
  'The Dance of Life',
  'Sagebrush Trail',
];

const MESSAGES = [
  'cool film',
  'great plot',
  'the ending surprised',
  'incredible movie I want to revisit ',
];

const AGE_RESTRICTIONS = [
  '+0',
  '+6',
  '12+',
  '16+',
  '18+',
];

const DIRECTORS = [
  'Anthony Mann',
  'Ben Affleck',
];

const WRITTERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const RELEASE_DATES = [
  '30 March 1945',
  '12 April 1976',
  '14 September 1977',
];

const COUNTRYS = [
  'USA',
  'Russia',
  'Canada',
];

const ACTORS_FILMS = [
  'Ben Affleck',
  'Zack Baff',
  'Zack Efron',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const formatDuration = (minutes) => dayjs.duration(minutes,'minutes').format('H[h] mm[m]');

export { AUTHORS, YEARS, GENRES, EMOJIES, NAME_FILMS, MESSAGES, AGE_RESTRICTIONS,
  DIRECTORS, WRITTERS, RELEASE_DATES, COUNTRYS, ACTORS_FILMS, DESCRIPTIONS, formatDuration };
