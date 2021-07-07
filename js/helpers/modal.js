import {isEscEvent} from './util.js';

const bodyElement = document.body;

const init = {};

const modalElementFocusHandler = (evt) => {
  if (!init.modalElement.contains(evt.target)) {
    evt.stopPropagation();
    init.modalElement.focus();
  }
};

const escKeydownHandler = (evt) => {
  if (evt.target.tagName !== 'INPUT'
    && evt.target.tagName !== 'TEXTAREA'
    && isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const overlayElementClickHandler = (evt) => {
  if (evt.target.matches(init.overlayElement.tagName)) {
    closeModal();
  }
};

const closeButtonClickHandler = () => {
  closeModal();
};

function closeModal () {
  if (init.overlayElement) {
    bodyElement.classList.remove('modal-open');
    window.scrollTo(0, init.scrollPosition);
    bodyElement.removeAttribute('style');
    init.modalElement.removeAttribute('tabindex');
    init.overlayElement.classList.add('hidden');
    init.lastFocus.focus();

    document.removeEventListener('focus', modalElementFocusHandler, true);
    document.removeEventListener('keydown', escKeydownHandler);

    if (init.isOverlayClickable) {
      init.overlayElement.removeEventListener('click', overlayElementClickHandler);
    }

    if (init.closeButton) {
      init.closeButton.removeEventListener('click', closeButtonClickHandler);
    }
  }

  if (init.closeModalCallback) {
    init.closeModalCallback();
  }
}

function openModal() {
  init.lastFocus = document.activeElement;
  init.scrollPosition = window.pageYOffset;
  init.paddingSize = window.innerWidth - bodyElement.clientWidth;

  bodyElement.style.top = `-${init.scrollPosition}px`;

  if (init.paddingSize) {
    bodyElement.style.paddingRight = `${init.paddingSize}px`;
  }

  if (init.overlayElement && init.modalElement) {
    bodyElement.classList.add('modal-open');
    init.overlayElement.classList.remove('hidden');
    init.modalElement.tabIndex = -1;
    init.modalElement.focus();

    document.addEventListener('focus', modalElementFocusHandler, true);
    document.addEventListener('keydown', escKeydownHandler);

    if (init.isOverlayClickable) {
      init.overlayElement.addEventListener('click', overlayElementClickHandler);
    }

    if (init.closeButton) {
      init.closeButton.addEventListener('click', closeButtonClickHandler);
    }
  }

  if (init.openModalCallback) {
    init.openModalCallback();
  }
}

const initModal = (...args) => {
  [
    init.modalElement,
    init.closeButton,
    init.overlayElement,
    init.isOverlayClickable,
    init.openModalCallback,
    init.closeModalCallback,
  ] = [...args];

  openModal();
};

export {initModal, closeModal};
