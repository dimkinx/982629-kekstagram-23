import {debounce, shuffleArray} from '../helpers/util.js';

const TIMEOUT_DELAY = 500;

const filtersContainerElement = document.querySelector('.img-filters');
const filtersButtonsElements = filtersContainerElement.querySelectorAll('.img-filters__button');

const filtersClickHandler = (data, cb) => (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.img-filters__button')) {
    let filteredData = [];

    filtersButtonsElements.forEach((buttonElement) => buttonElement
      .classList
      .remove('img-filters__button--active'));

    targetElement.classList.add('img-filters__button--active');

    if (targetElement.matches('#filter-default')) {
      filteredData = data;
    }

    if (targetElement.matches('#filter-random')) {
      filteredData = shuffleArray([...data]).slice(0, 10);
    }

    if (targetElement.matches('#filter-discussed')) {
      filteredData = [...data].sort((
        firstPictureData,
        secondPictureData,
      ) => secondPictureData.comments.length - firstPictureData.comments.length);
    }

    return cb(filteredData);
  }
};

const initFilters = (data, cb) => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', debounce(filtersClickHandler(data, cb), TIMEOUT_DELAY));
};

export {initFilters};
