const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const shuffleArray = (array) => [...array].map((_, index, newArray) => {
  const randomIndex = index + (Math.floor(Math.random() * (newArray.length - index)));
  [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];

  return newArray[index];
});

const checkStringLength = (string, length) => string.length <= length;

const cropString = (string, length) => !checkStringLength(string) && string
  .slice(0, length - 3)
  .padEnd(length, '.');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const makeFragmentRender = (render) => (dataList) => {
  const fragment = document.createDocumentFragment();

  dataList.forEach((data) => {
    fragment.appendChild(render(data));
  });

  return fragment;
};

export {
  getRandomPositiveInteger,
  shuffleArray,
  checkStringLength,
  cropString,
  isEscEvent,
  makeFragmentRender
};
