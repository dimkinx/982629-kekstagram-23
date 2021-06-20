import {isEscEvent} from './util.js';

const bodyElement = document.querySelector('body');

const initModal = (overlayElement, modalElement, closeButton) => {
  const lastFocus = document.activeElement;

  const modalElementFocusHandler = (evt) => {
    if (!modalElement.contains(evt.target)) {
      evt.stopPropagation();
      modalElement.focus();
    }
  };

  const escKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const overlayElementClickHandler = (evt) => {
    if (evt.target.matches(overlayElement.tagName)) {
      closeModal();
    }
  };

  const closeButtonClickHandler = () => {
    closeModal();
  };

  function closeModal () {
    if (overlayElement) {
      bodyElement.classList.remove('modal-open');
      overlayElement.classList.add('hidden');
      modalElement.removeAttribute('tabindex');
      lastFocus.focus();

      document.removeEventListener('focus', modalElementFocusHandler, true);
      document.removeEventListener('keydown', escKeydownHandler);
      overlayElement.removeEventListener('click', overlayElementClickHandler);

      if (closeButton) {
        closeButton.removeEventListener('click', closeButtonClickHandler);
      }
    }
  }

  if (overlayElement && modalElement) {
    bodyElement.classList.add('modal-open');
    overlayElement.classList.remove('hidden');
    modalElement.tabIndex = -1;
    modalElement.focus();

    document.addEventListener('focus', modalElementFocusHandler, true);
    document.addEventListener('keydown', escKeydownHandler);
    overlayElement.addEventListener('click', overlayElementClickHandler);

    if (closeButton) {
      closeButton.addEventListener('click', closeButtonClickHandler);
    }
  }
};

export default initModal;
