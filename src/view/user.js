
import Abstract from './utils-abstract.js';

const createUserList = (filmsCount) => {
  let rang = '';
  if(filmsCount >= 1 && filmsCount <= 10) {
    rang = 'novice';
  } else if(filmsCount >= 11 && filmsCount <= 20) {
    rang = 'fan';
  } else if (filmsCount > 20) {
    rang = 'movie buff';
  }
  return `<section class="header__profile profile">
  <p class="profile__rating">${rang}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class SiteMenuUser extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createUserList(this._films.length);
  }
}
