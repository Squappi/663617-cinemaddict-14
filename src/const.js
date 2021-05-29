import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';


dayjs.extend(duration);
export const formatDuration = (minutes) => {
  const duration=dayjs.duration(minutes, 'minutes');
  if(duration.asDays()>=1){
    return duration.format('D[d] H[h] mm[m]');
  }
  return duration.format('H[h] mm[m]');
};

export const SortType = {
  DEFAULT: 'Default',
  DATE: 'Date',
  RATING: 'Dating',
};

export const ACTION_TYPE = {
  DELETE: 'Delete',
};

export const EVENT_TYPE = {
  SHOW_STATS: 'showStats',
  SHOW_FILMS: 'showFilms',
  SET_FILMS: 'setFilms',
  CHANGE_FILTER: 'changeFilter',
  ADD_TO_LIST: 'addToList',
};
