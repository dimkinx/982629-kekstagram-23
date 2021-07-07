const debounce = function(cb, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => [...array].map((_, index, newArray) => {
  const randomIndex = index + (Math.floor(Math.random() * (newArray.length - index)));
  [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];

  return newArray[index];
});

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isSpaceEvent = (evt) => evt.key === ' ';

const makeFragmentRender = (render) => (dataList) => {
  const fragment = document.createDocumentFragment();

  dataList.forEach((data) => {
    fragment.appendChild(render(data));
  });

  return fragment;
};

export {
  debounce,
  shuffleArray,
  isEscEvent,
  isSpaceEvent,
  makeFragmentRender
};
