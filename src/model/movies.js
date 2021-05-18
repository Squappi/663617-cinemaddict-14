import Observer from '../observer';

export default class Movies extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  setTasks(tasks) {
    this._tasks.push(...tasks);
  }

  getTasks(filter) {
    if(filter === 'AllMovies') {
      return this._tasks;
    } else {
      return this._tasks.filter((film) => {
        switch (filter) {
          case 'watchlist':
            return film.allMovies.watchList;
          case 'history':
            return film.allMovies.history;
          default:
            return film.allMovies.favorites;
        }
      });
    }
  }

  updateFilm(film) {
    const oldFilm = this._tasks.filter((task) => {
      return task.id === film.id;
    })[0];
    this._tasks[this._tasks.indexOf(oldFilm)] = film;
  }
}
