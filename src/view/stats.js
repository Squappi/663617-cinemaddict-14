import Abstract from './utils-abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GENRES } from '../mock/const';
import { statsData } from '../utils';
import dayjs from 'dayjs';

const countStatistic = (genre, films) => {
  const countsFilms = [];
  let totalCount = 0;
  let maxGenre = '';
  let maxCount = 0;
  let totalTime = 0;
  for (let i = 0; i < genre.length; i++) {
    const length = films.filter((film) => {
      return film.genre.includes(genre[i]);
    }).length;
    countsFilms.push(length);
    totalCount += length;
    if(length > maxCount) {
      maxCount = length;
      maxGenre = genre[i];
    }
  }
  films.forEach((film) => {
    totalTime += parseInt(film.duration);
  });
  return {
    countsFilms: countsFilms,
    totalCount: totalCount,
    maxGenre: maxGenre,
    totalTime: totalTime,
  };
};

export const createStatistic = (films, period) => {
  const currentFilms = films.filter((film) => {
    return statsData(film.watchHistory.watchDate, new Date(), period);
  });
  const BAR_HEIGHT = 50;
  const statisticCtx = document.querySelector('.statistic__chart').getContext('2d');
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы

  statisticCtx.height = BAR_HEIGHT * GENRES.length;
  const statistic = countStatistic(GENRES, currentFilms);
  document.querySelectorAll('.statistic__item-text')[0].innerHTML = statistic.totalCount;
  document.querySelectorAll('.statistic__item-text')[1].innerHTML = dayjs.duration(statistic.totalTime,'minutes')
    .format('H[h] mm[m]');
  document.querySelectorAll('.statistic__item-text')[2].innerHTML = statistic.maxGenre;
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: GENRES,
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


const createStats = () => {
  return `<section class="statistic visually-hidden">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Movie buff</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text"><span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">Sci-Fi</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class StatsView extends Abstract {
  constructor(films) {
    super();

    this.getElement().querySelector('.statistic__filters').addEventListener('change', (evt) => {
      evt.preventDefault();
      createStatistic(films.filter((film) =>{
        return film.watchHistory.isWatch;
      }), evt.target.value);
    });
  }

  getTemplate() {
    return createStats();
  }
}

