const debounce = function(cb, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    if (!timeoutId) {
      cb.apply(this, rest);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
    }, timeoutDelay);
  };
};

const shuffleArray = (arrayData) => arrayData.map((_, index, newArrayData) => {
  const randomIndex = index + (Math.floor(Math.random() * (newArrayData.length - index)));
  [newArrayData[index], newArrayData[randomIndex]] = [newArrayData[randomIndex], newArrayData[index]];

  return newArrayData[index];
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
