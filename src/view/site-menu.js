const createSiteMenu = (filter) => {
  const { name, count, active } = filter;

  return `<a href="#${name}" data-filter-type = "${name}" class="main-navigation__item${active ? ' main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems, active) => {
  const filtersItemTemplate = filterItems
    .map((filter, index) => createSiteMenu(filter, index === 0)).join('');

  return  `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" data-filter-type = "AllMovies" class="main-navigation__item${active ? ' main-navigation__item--active' : ''}">All movies</a>
    ${filtersItemTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};


