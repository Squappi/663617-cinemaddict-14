import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';


const formatDuration = (minutes) => dayjs.duration(minutes,'minutes').format('H[h] mm[m]');
dayjs.extend(duration);

export const SortType = {
  DEFAULT: 'Default',
  DATE: 'Date',
  RATING: 'Dating',
};

export const ACTION_TYPE = {
  DELETE: 'Delete',
};

export { formatDuration };
