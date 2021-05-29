import Abstract from './abstract';


const createLoading = () => {
  return '<h2 class="films-list__title">Loading...</h2>';
};

export default class LoadingMessage extends Abstract {
  getTemplate() {
    return createLoading();
  }
}
