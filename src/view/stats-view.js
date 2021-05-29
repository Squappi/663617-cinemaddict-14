import Smart from '../presenter/smart';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRank, statsData} from '../utils';
import { formatDuration } from '../const';

const countStatistic = (films) => {
  const genre = Array.from(new Set(films.flatMap((film) => film.genre)).values());
  const countsFilms = [];
  const totalCount = films.length;
  let maxGenre = '';
  let maxCount = 0;
  let totalTime = 0;
  for (const oneGenre of genre) {
    const length = films.filter((film) => {
      return film.genre.includes(oneGenre);
    }).length;
    countsFilms.push(length);
    if (length > maxCount) {
      maxCount = length;
      maxGenre = oneGenre;
    }
  }
  films.forEach((film) => {
    totalTime += parseInt(film.duration);
  });
  return {
    genre: genre,
    countsFilms: countsFilms,
    totalCount: totalCount,
    maxGenre: maxGenre,
    totalTime: totalTime,
  };
};

const createStatistic = (statistic) => {
  const BAR_HEIGHT = 50;
  const statisticCtx = document.querySelector('.statistic__chart').getContext('2d');
  statisticCtx.height = BAR_HEIGHT * statistic.genre.length;

  new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: statistic.genre,
      datasets: [{
        data: statistic.countsFilms,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStats = (statistic, filmCount, currentFilter) => {
  return `<section class="statistic visually-hidden">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${getUserRank(filmCount)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${(currentFilter === 'all-time') ? 'checked' : ''}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden " name="statistic-filter" id="statistic-today" value="today" ${(currentFilter === 'today') ? 'checked' : ''}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden " name="statistic-filter" id="statistic-week" value="week" ${(currentFilter === 'week') ? 'checked' : ''}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden " name="statistic-filter" id="statistic-month" value="month" ${(currentFilter === 'month') ? 'checked' : ''}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden " name="statistic-filter" id="statistic-year" value="year" ${(currentFilter === 'year') ? 'checked' : ''}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${statistic.totalCount}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${formatDuration(statistic.totalTime)}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${statistic.maxGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class StatsView extends Smart {
  constructor(filmModel) {
    super();
    this._filmModel = filmModel;
    this._currentFilter = 'all-time';
    this.recalculate();
    this.restoreHandlers();
  }

  recalculate() {
    this._statistic = countStatistic(this._filmModel.getTasks('history')
      .filter((film) => {
        return statsData(film.allMovies.watchDate, new Date(), this._currentFilter);
      }));
  }

  getTemplate() {
    return createStats(this._statistic, this._filmModel.getTasks('history').length, this._currentFilter);
  }

  restoreHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', (evt) => {
      evt.preventDefault();
      this._currentFilter = evt.target.value;
      this.show();
    });
  }

  updateStats() {
    this.recalculate();
    this.updateElement();
    createStatistic(this._statistic);
  }

  show() {
    this.updateStats();
    super.show();
  }
}

