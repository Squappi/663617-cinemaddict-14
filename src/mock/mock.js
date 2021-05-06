import {
  AUTHORS, YEARS, GENRES, EMOJIES, NAME_FILMS, MESSAGES, AGE_RESTRICTIONS,
  DIRECTORS, WRITTERS, RELEASE_DATES, COUNTRYS, ACTORS_FILMS, DESCRIPTIONS
} from './const.js';

const getRandonInteger = (a = 0, b = 1) => {
  const LOWER = Math.ceil(Math.min(a, b));
  const UPPER = Math.ceil(Math.max(a, b));

  return Math.floor(LOWER + Math.random() * (UPPER - LOWER + 1));
};

const getRandonFloat = (a = 0, b = 1) => {
  const LOWER = Math.ceil(Math.min(a, b));
  const UPPER = Math.ceil(Math.max(a, b));

  return Math.fround(LOWER + Math.random() * (UPPER - LOWER + 1)).toFixed(1);
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


const getComment = () => {
  return {
    emoji: EMOJIES[getRandonInteger(0, 3)],
    data: `${getRandonInteger(2000, 2020)}/${getRandonInteger(1, 12)}/${getRandonInteger(1, 31)} ${getRandonInteger(1, 24)}:${getRandonInteger(1, 59)}`,
    author: AUTHORS[getRandonInteger(0, 5)],
    message: MESSAGES[getRandonInteger(0, MESSAGES.length - 1)],
  };
};
let counter = 1;
export const generateCard = () => {
  return {
    id: counter++,
    poster: './images/posters/the-man-with-the-golden-arm.jpg',
    nameFilm: NAME_FILMS[getRandonInteger(0, NAME_FILMS.length - 1)],
    rating: getRandonFloat(0, 10),
    year: YEARS[getRandonInteger(0, 3)],
    duration: `${getRandonInteger(0, 4)}h ${getRandonInteger(0, 60)}m`,
    genre: noRepite(new Array(getRandonInteger(1, 6)).fill('').map(() => GENRES[getRandonInteger(0, 5)])),
    description: (new Array(getRandonInteger(1, 5)).fill('').map(() => DESCRIPTIONS[getRandonInteger(0, 4)])).join(''),
    comment: new Array(getRandonInteger(0, 5)).fill('').map(getComment),
    ageRestriction: AGE_RESTRICTIONS[getRandonInteger(0, AGE_RESTRICTIONS.length - 1)],
    director: DIRECTORS[getRandonInteger(0, 1)],
    writter: new Array(getRandonInteger(1, 3)).fill('').map(() => WRITTERS[getRandonInteger(0, 2)]),
    releaseDate: RELEASE_DATES[getRandonInteger(0, 2)],
    country: COUNTRYS[getRandonInteger(0, 2)],
    actors: ACTORS_FILMS[getRandonInteger(1, 2)],
    allMovies: {
      watchList: Boolean(getRandonInteger(0, 1)),
      history: Boolean(getRandonInteger(0, 1)),
      favorites: Boolean(getRandonInteger(0, 1)),
    },
  };
};
