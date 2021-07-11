import {isEscEvent} from './util.js';

const InitModal = {};

const bodyElement = document.body;

const modalElementFocusHandler = (evt) => {
  if (!InitModal.modalElement.contains(evt.target)) {
    evt.stopPropagation();
    InitModal.modalElement.focus();
  }
};

const escKeydownHandler = (evt) => {
  if (evt.target.type !== 'text'
    && evt.target.tagName !== 'TEXTAREA'
    && isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const overlayElementClickHandler = (evt) => {
  if (evt.target.matches(InitModal.overlayElement.tagName)) {
    closeModal();
  }
};

const closeButtonClickHandler = () => {
  closeModal();
};

function closeModal () {
  if (InitModal.overlayElement) {
    bodyElement.classList.remove('modal-open');
    window.scrollTo(0, InitModal.scrollPosition);
    bodyElement.removeAttribute('style');
    InitModal.modalElement.removeAttribute('tabindex');
    InitModal.overlayElement.classList.add('hidden');
    InitModal.lastFocus.focus();

    document.removeEventListener('focus', modalElementFocusHandler, true);
    document.removeEventListener('keydown', escKeydownHandler);

    if (InitModal.isOverlayClickable) {
      InitModal.overlayElement.removeEventListener('click', overlayElementClickHandler);
    }

    if (InitModal.closeButton) {
      InitModal.closeButton.removeEventListener('click', closeButtonClickHandler);
    }
  }

  if (InitModal.closeModalCallback) {
    InitModal.closeModalCallback();
  }
}

function openModal() {
  InitModal.lastFocus = document.activeElement;
  InitModal.scrollPosition = window.pageYOffset;
  InitModal.paddingSize = window.innerWidth - bodyElement.clientWidth;

  bodyElement.style.top = `-${InitModal.scrollPosition}px`;

  if (InitModal.paddingSize) {
    bodyElement.style.paddingRight = `${InitModal.paddingSize}px`;
  }

  if (InitModal.overlayElement && InitModal.modalElement) {
    bodyElement.classList.add('modal-open');
    InitModal.overlayElement.classList.remove('hidden');
    InitModal.modalElement.tabIndex = -1;
    InitModal.modalElement.focus();

    document.addEventListener('focus', modalElementFocusHandler, true);
    document.addEventListener('keydown', escKeydownHandler);

    if (InitModal.isOverlayClickable) {
      InitModal.overlayElement.addEventListener('click', overlayElementClickHandler);
    }

    if (InitModal.closeButton) {
      InitModal.closeButton.addEventListener('click', closeButtonClickHandler);
    }
  }

  if (InitModal.openModalCallback) {
    InitModal.openModalCallback();
  }
}

const initModal = (...args) => {
  [
    InitModal.modalElement,
    InitModal.closeButton,
    InitModal.overlayElement,
    InitModal.isOverlayClickable,
    InitModal.openModalCallback,
    InitModal.closeModalCallback,
  ] = [...args];

  openModal();
};

export {initModal, closeModal};
