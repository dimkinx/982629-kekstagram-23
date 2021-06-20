import {isEscEvent} from './util.js';

const bodyElement = document.querySelector('body');

const initModal = (modalElement, closeButton) => {
  const lastFocus = document.activeElement;

  const escKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const closeButtonClickHandler = () => {
    closeModal();
  };

  const modalElementFocusHandler = (evt) => {
    if (!modalElement.contains(evt.target)) {
      evt.stopPropagation();
      modalElement.focus();
    }
  };

  function closeModal () {
    if (modalElement) {
      modalElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      lastFocus.focus();

      document.removeEventListener('focus', modalElementFocusHandler, true);
      document.removeEventListener('keydown', escKeydownHandler);

      if (closeButton) {
        closeButton.removeEventListener('click', closeButtonClickHandler);
      }
    }
  }

  if (modalElement) {
    modalElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    modalElement.focus();

    document.addEventListener('focus', modalElementFocusHandler, true);
    document.addEventListener('keydown', escKeydownHandler);

    if (closeButton) {
      closeButton.addEventListener('click', closeButtonClickHandler);
    }
  }
};

export {initModal};
