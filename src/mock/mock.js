const getRandonInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.ceil(Math.max(a,b));

  return Math.floor( lower + Math.random() * (upper - lower +1));
};

const getRandonFloat = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.ceil(Math.max(a,b));

  return Math.fround(lower + Math.random() * (upper - lower +1)).toFixed(1);
};

const authors = [
  'Виталий',
  'Арсений',
  'Владислав',
  'Эльвира',
  'Григорий',
  'Вячеслав',
];

const years = [
  '1955',
  '1937',
  '1940',
  '1925',
];

const genres = [
  'Drama',
  'Mystery',
  'Comedy',
  'Musical',
  'Western',
  'Cartoon',
];

const EMOJIES = [
  './images/emoji/angry.png',
  './images/emoji/puke.png',
  './images/emoji/sleeping.png',
  './images/emoji/smile.png',
];

const getNameFilms = () => {
  const nameFilms = [
    'The Man with the Golden Arm',
    'Made for Each Other',
    'Santa Claus Conquers the Martians',
    'The Great Flamarion',
    'The Dance of Life',
    'Sagebrush Trail',
  ];

  const randomFilm = getRandonInteger(0, nameFilms.length - 1);
  return nameFilms[randomFilm];
};

const messages = [
  'cool film',
  'great plot',
  'the ending surprised',
  'incredible movie I want to revisit ',
];

const ageRestrictions = [
  '+0',
  '+6',
  '12+',
  '16+',
  '18+',
];

const directors = [
  'Anthony Mann',
  'Ben Affleck',
];

const getWritters = () => {
  const writters = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];
  const randomWritters = getRandonInteger(0, writters.length - 1);
  return writters[randomWritters];
};

const releaseDates = [
  '30 March 1945',
  '12 April 1976',
  '14 September 1977',
];

const countrys = [
  'USA',
  'Russia',
  'Canada',
];

const actorsFilms = [
  'Ben Affleck',
  'Zack Baff',
  'Zack Efron',
];

const getDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Cras aliquet varius magna, non porta ligula feugiat eget',
    'Fusce tristique felis at fermentum pharetra',
    'Aliquam id orci ut lectus varius viverra',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  ];
  const randomDescription = getRandonInteger(0, descriptions.length - 1);
  return descriptions[randomDescription];
};

export const noRepite = (array) => {
  const newEntrieArray = [];
  for (let i = 0; i < array.length; i++) {
    if(!newEntrieArray.includes(array[i])){
      newEntrieArray.push(array[i]);
    }}
  return newEntrieArray;
};


const getComment = () => {
  return {
    emoji: EMOJIES[getRandonInteger(0, 3)],
    data: `${getRandonInteger(2000, 2020)}/${getRandonInteger(1, 12)}/${getRandonInteger(1, 31)} ${getRandonInteger(1, 24)}:${getRandonInteger(1, 59)}`,
    author: authors[getRandonInteger(0, 5)],
    message: messages[getRandonInteger(0, messages.length - 1)],
  };
};

export const generateCard = () => {
  return {
    poster: './images/posters/the-man-with-the-golden-arm.jpg',
    nameFilm: getNameFilms(),
    rating: getRandonFloat(0, 10),
    year: years[getRandonInteger(0, 3)],
    duration: `${getRandonInteger(0, 5)}h ${getRandonInteger(0, 60)}m`,
    genre: new Array(getRandonInteger(1,5)).fill('').map(() => genres[getRandonInteger(1, 5)]),
    description: new Array (getRandonInteger(1, 5)).fill('').map(getDescription),
    comment: new Array(getRandonInteger(0, 5)).fill('').map(getComment),
    ageRestriction: ageRestrictions[getRandonInteger(0, ageRestrictions.length - 1)],
    director: directors[getRandonInteger(0, 1)],
    writter: new Array(getRandonInteger(1,3)).fill('').map(getWritters),
    releaseDate: releaseDates[getRandonInteger(0,2)],
    country: countrys[getRandonInteger(0,2)],
    actors: actorsFilms[getRandonInteger(1,2)],
    allMovies : {
      watchList: Boolean(getRandonInteger(0,1)),
      history: Boolean(getRandonInteger(0, 1)),
      favorites: Boolean(getRandonInteger(0,1)),
    },
  };
};

