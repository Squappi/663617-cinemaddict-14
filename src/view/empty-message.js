import Abstract from './abstract.js';

const createEmptyMessage = () => {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
};

export default class EmptyMessage extends Abstract{
  getTemplate() {
    return createEmptyMessage();
  }
}
