import {isSpaceEvent} from '../helpers/util.js';

const HASHTAGS_MAX_NUM = 5;
const HASHTAG_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionTextareaElement = document.querySelector('.text__description');

const getRemainderOfNum = (num) => {
  if (num % 100 > 19) {
    return num % 10;
  }

  return num % 100;
};

const getEndingWords = (num, nominative, genitiveSingular, genitivePlural) => {
  if (getRemainderOfNum(num) === 0 || getRemainderOfNum(num) > 4) {
    return genitivePlural;
  }

  return getRemainderOfNum(num) === 1
    ? nominative
    : genitiveSingular;
};

const getHashtagErrorMessage = (hashtagText, index) => {
  if (hashtagText[0] !== '#') {
    return 'Хэш-тег должен начинаться с символа # (решётка)';
  }

  if (hashtagText.length > HASHTAG_MAX_LENGTH) {
    const difference = hashtagText.length - HASHTAG_MAX_LENGTH;
    const words = getEndingWords(difference, 'символ', 'символа', 'символов');

    return `Вы превысили максимальную длину ${++index}-го хэш-тега на ${difference} ${words}`;
  }

  if (!hashtagText.slice(1)) {
    return 'Хеш-тег не может состоять только из одной решётки';
  }

  if (!(/^[а-яa-z0-9]+$/).test(hashtagText.slice(1).toLowerCase())) {
    return 'Строка хэш-тега после решётки должна состоять из букв и чисел';
  }

  return '';
};

const getHashtagsErrorMessage = (hashtagsText) => {
  const hashtags = hashtagsText
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => hashtag.length > 0);

  if (hashtags.length > HASHTAGS_MAX_NUM) {
    return `Нельзя указать больше ${HASHTAGS_MAX_NUM} хэш-тегов`;
  }

  if (hashtags.length !== [...new Set(hashtags)].length) {
    return 'Один и тот же хэш-тег не может быть использован дважды';
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (getHashtagErrorMessage(hashtags[i])) {
      return getHashtagErrorMessage(hashtags[i], i);
    }
  }

  return '';
};

const getDescriptionErrorMessage = (description) => {
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    const difference = description.length - DESCRIPTION_MAX_LENGTH;
    const words = getEndingWords(difference, 'символ', 'символа', 'символов');

    return `Вы превысили максимальную длину комментария на ${difference} ${words} из 140 доступных`;
  }

  return '';
};

const hashtagFocusHandler = () => {
  if (hashtagsInputElement.value === '') {
    hashtagsInputElement.value = '#';
  }

  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const hashtagBlurHandler = () => {
  if (hashtagsInputElement.value === '#') {
    hashtagsInputElement.value = '';
  } else if (hashtagsInputElement.value.slice(-1) === '#') {
    hashtagsInputElement.value = hashtagsInputElement.value.slice(0, -1);
  }

  hashtagsInputElement.value = hashtagsInputElement.value.trim();
  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
};

const hashtagInputHandler = () => {
  if (hashtagsInputElement.value !== '' && hashtagsInputElement.value.slice(0, 1) !== '#') {
    hashtagsInputElement.value = `#${hashtagsInputElement.value}`;
  }

  hashtagsInputElement.value = hashtagsInputElement.value.trim().replace(/[ ]+/g, ' ');
  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const hashtagSpaceKeydownHandler = (evt) => {
  if (isSpaceEvent(evt)) {
    if (hashtagsInputElement.value.slice(-1) === '#') {
      evt.preventDefault();
    } else if (hashtagsInputElement.value === '') {
      evt.preventDefault();
      hashtagsInputElement.value = '#';
    } else if (hashtagsInputElement.value !== '') {
      evt.preventDefault();
      hashtagsInputElement.value = `${hashtagsInputElement.value} #`;
    }
  }

  hashtagsInputElement.setCustomValidity(getHashtagsErrorMessage(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

const descriptionInputHandler = () => {
  descriptionTextareaElement.setCustomValidity(getDescriptionErrorMessage(descriptionTextareaElement.value));
  descriptionTextareaElement.reportValidity();
};

const initValidation = () => {
  hashtagsInputElement.addEventListener('focus', hashtagFocusHandler);
  hashtagsInputElement.addEventListener('blur', hashtagBlurHandler);
  hashtagsInputElement.addEventListener('input', hashtagInputHandler);
  hashtagsInputElement.addEventListener('keydown', hashtagSpaceKeydownHandler);
  descriptionTextareaElement.addEventListener('input', descriptionInputHandler);
};

const destroyValidation = () => {
  hashtagsInputElement.removeEventListener('focus', hashtagFocusHandler);
  hashtagsInputElement.removeEventListener('blur', hashtagBlurHandler);
  hashtagsInputElement.removeEventListener('input', hashtagInputHandler);
  hashtagsInputElement.removeEventListener('keydown', hashtagSpaceKeydownHandler);
  descriptionTextareaElement.removeEventListener('input', descriptionInputHandler);
  hashtagsInputElement.setCustomValidity('');
  descriptionTextareaElement.setCustomValidity('');
};

export {hashtagsInputElement, descriptionTextareaElement, initValidation, destroyValidation};
