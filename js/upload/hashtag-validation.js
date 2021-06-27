import {isSpaceEvent} from '../helpers/util.js';

const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionTextareaElement = document.querySelector('.text__description');

const HASHTAGS_MAX_NUM = 5;
const HASHTAG_MAX_LENGTH = 20;

const getRemainderOfNum = function (num) {
  if (num % 100 > 19) {
    return num % 10;
  }

  return num % 100;
};

const getEndingWords = function (num, nominative, genitiveSingular, genitivePlural) {
  if (getRemainderOfNum(num) === 0 || getRemainderOfNum(num) > 4) {
    return genitivePlural;
  }

  return getRemainderOfNum(num) === 1
    ? nominative
    : genitiveSingular;
};

const getHashtagErrorMessage = (hashtag, index) => {
  if (hashtag[0] !== '#') {
    return 'Хэш-тег должен начинаться с символа # (решётка)';
  }

  if (hashtag.length > HASHTAG_MAX_LENGTH) {
    const difference = hashtag.length - HASHTAG_MAX_LENGTH;
    const words = getEndingWords(difference, 'символ', 'символа', 'символов');

    return `Вы превысили максимальную длину ${++index}-го хэш-тега на ${difference} ${words}`;
  }

  if (!hashtag.slice(1)) {
    return 'Хеш-тег не может состоять только из одной решётки';
  }

  if (!(/^[а-яa-z0-9]+$/).test(hashtag.slice(1).toLowerCase())) {
    return 'Строка хэш-тега после решётки должна состоять из букв и чисел';
  }

  return '';
};

const getHashtagsErrorMessage = (hashtags) => {
  const array = hashtags
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => hashtag.length > 0);

  if (array.length > HASHTAGS_MAX_NUM) {
    return `Нельзя указать больше ${HASHTAGS_MAX_NUM} хэш-тегов`;
  }

  if (array.length !== [...new Set(array)].length) {
    return 'Один и тот же хэш-тег не может быть использован дважды';
  }

  for (let i = 0; i < array.length; i++) {
    if (getHashtagErrorMessage(array[i])) {
      return getHashtagErrorMessage(array[i], i);
    }
  }

  return '';
};

const focusHandler = () => {
  if (hashtagsInputElement.value === '') {
    hashtagsInputElement.value = '#';
  }
};

const blurHandler = () => {
  if (hashtagsInputElement.value === '#') {
    hashtagsInputElement.value = '';
  } else if (hashtagsInputElement.value.slice(-1) === '#') {
    hashtagsInputElement.value = hashtagsInputElement.value.slice(0, -1);
  }

  hashtagsInputElement.value = hashtagsInputElement.value.trim();
  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const inputHandler = () => {
  if (hashtagsInputElement.value !== '' && hashtagsInputElement.value.slice(0, 1) !== '#') {
    hashtagsInputElement.value = `#${hashtagsInputElement.value}`;
  }

  hashtagsInputElement.value = hashtagsInputElement.value.trim().replace(/[ ]+/g, ' ');
  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const spaceKeydownHandler = (evt) => {
  if (isSpaceEvent(evt) && hashtagsInputElement.value.slice(-1) === '#') {
    evt.preventDefault();
  } else if (isSpaceEvent(evt) && hashtagsInputElement.value === '') {
    evt.preventDefault();
    hashtagsInputElement.value = '#';
  } else if (isSpaceEvent(evt) && hashtagsInputElement.value !== '') {
    evt.preventDefault();
    hashtagsInputElement.value = `${hashtagsInputElement.value} #`;
  }

  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const initHashtagValidation = () => {
  hashtagsInputElement.addEventListener('focus', focusHandler);
  hashtagsInputElement.addEventListener('blur', blurHandler);
  hashtagsInputElement.addEventListener('input', inputHandler);
  hashtagsInputElement.addEventListener('keydown', spaceKeydownHandler);
};

const destroyHashtagValidation = () => {
  hashtagsInputElement.removeEventListener('focus', focusHandler);
  hashtagsInputElement.removeEventListener('blur', blurHandler);
  hashtagsInputElement.removeEventListener('input', inputHandler);
  hashtagsInputElement.removeEventListener('keydown', spaceKeydownHandler);
  hashtagsInputElement.setCustomValidity('');
};

export {hashtagsInputElement, descriptionTextareaElement, initHashtagValidation, destroyHashtagValidation};
