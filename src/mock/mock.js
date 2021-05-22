import {
  AUTHORS, YEARS, GENRES, EMOJIES, NAME_FILMS, MESSAGES, AGE_RESTRICTIONS,
  DIRECTORS, WRITTERS, RELEASE_DATES, COUNTRYS, ACTORS_FILMS, DESCRIPTIONS
} from './const.js';
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const LOWER = Math.ceil(Math.min(a, b));
  const UPPER = Math.ceil(Math.max(a, b));

  return Math.floor(LOWER + Math.random() * (UPPER - LOWER + 1));
};

const getRandomFloat = (a = 0, b = 1) => {
  const LOWER = Math.ceil(Math.min(a, b));
  const UPPER = Math.ceil(Math.max(a, b));

  return Number(Math.fround(LOWER + Math.random() * (UPPER - LOWER + 1)).toFixed(1));
};

export const noRepite = (array) => {
  const newEntrieArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!newEntrieArray.includes(array[i])) {
      newEntrieArray.push(array[i]);
    }
  }
  return newEntrieArray;
};

let counter = 1;
let counterComment = 1;

const getComment = () => {
  return {
    id: counterComment++,
    emoji: EMOJIES[getRandomInteger(0, 3)],
    data: `${getRandomInteger(2000, 2020)}/${getRandomInteger(1, 12)}/${getRandomInteger(1, 31)} ${getRandomInteger(1, 24)}:${getRandomInteger(1, 59)}`,
    author: AUTHORS[getRandomInteger(0, 5)],
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  };
};

export const generateCard = () => {
  return {
    id: counter++,
    poster: './images/posters/the-man-with-the-golden-arm.jpg',
    nameFilm: NAME_FILMS[getRandomInteger(0, NAME_FILMS.length - 1)],
    rating: getRandomFloat(0, 10),
    year: YEARS[getRandomInteger(0, 3)],
    duration: `${getRandomInteger(0, 260)}`,
    genre: noRepite(new Array(getRandomInteger(1, 6)).fill('').map(() => GENRES[getRandomInteger(0, 5)])),
    description: (new Array(getRandomInteger(1, 5)).fill('').map(() => DESCRIPTIONS[getRandomInteger(0, 4)])).join(''),
    comment: new Array(getRandomInteger(0, 5)).fill('').map(getComment),
    ageRestriction: AGE_RESTRICTIONS[getRandomInteger(0, AGE_RESTRICTIONS.length - 1)],
    director: DIRECTORS[getRandomInteger(0, 1)],
    writter: new Array(getRandomInteger(1, 3)).fill('').map(() => WRITTERS[getRandomInteger(0, 2)]),
    releaseDate: RELEASE_DATES[getRandomInteger(0, 2)],
    country: COUNTRYS[getRandomInteger(0, 2)],
    actors: ACTORS_FILMS[getRandomInteger(1, 2)],
    allMovies: {
      watchList: Boolean(getRandomInteger(0, 1)),
      history: Boolean(getRandomInteger(0, 1)),
      favorites: Boolean(getRandomInteger(0, 1)),
    },
    watchHistory: {
      isWatch: Boolean(getRandomInteger(0, 1)),
      watchDate: dayjs(getRandomInteger(dayjs().add(-1, 'year').valueOf(), dayjs().valueOf())).toISOString(),
    },
  };
};
