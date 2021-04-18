const createSiteMenu = (filter) => {
  const { name, count } = filter;

  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplete = (filterItems) => {
  const filtersItemTemplate = filterItems
    .map((filter, index) => createSiteMenu(filter, index === 0)).join('');

  return  `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersItemTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
