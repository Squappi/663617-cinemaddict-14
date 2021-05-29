import Smart from '../presenter/smart';
import {getUserRank} from '../utils';

const createUserList = (filmsCount) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${getUserRank(filmsCount)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class SiteMenuUser extends Smart {
  constructor(films) {
    super();
    this._films = films;
    this.updateFilms = this.updateFilms.bind(this);
  }

  restoreHandlers() {
  }

  getTemplate() {
    return createUserList(this._films.filter((film) => {
      return film.allMovies.history;
    }).length);
  }

  updateFilms(films) {
    this._films = films;
    this.updateElement();
  }
}
