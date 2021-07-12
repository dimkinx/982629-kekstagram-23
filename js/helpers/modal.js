import {isEscEvent} from './util.js';

const modal = {};

const bodyElement = document.body;

const modalElementFocusHandler = (evt) => {
  if (!modal.modalElement.contains(evt.target)) {
    evt.stopPropagation();
    modal.modalElement.focus();
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
  if (evt.target.matches(modal.overlayElement.tagName)) {
    closeModal();
  }
};

const closeButtonClickHandler = () => {
  closeModal();
};

function closeModal () {
  if (modal.overlayElement) {
    bodyElement.classList.remove('modal-open');
    window.scrollTo(0, modal.scrollPosition);
    bodyElement.removeAttribute('style');
    modal.modalElement.removeAttribute('style');
    modal.modalElement.removeAttribute('tabindex');
    modal.overlayElement.classList.add('hidden');
    modal.lastFocus.focus();

    document.removeEventListener('focus', modalElementFocusHandler, true);
    document.removeEventListener('keydown', escKeydownHandler);

    if (modal.isOverlayClickable) {
      modal.overlayElement.removeEventListener('click', overlayElementClickHandler);
    }

    if (modal.closeButton) {
      modal.closeButton.removeEventListener('click', closeButtonClickHandler);
    }
  }

  if (modal.closeModalCallback) {
    modal.closeModalCallback();
  }
}

function openModal() {
  modal.lastFocus = document.activeElement;
  modal.scrollPosition = window.pageYOffset;
  modal.paddingSize = window.innerWidth - bodyElement.clientWidth;

  bodyElement.style.top = `-${modal.scrollPosition}px`;

  if (modal.paddingSize) {
    bodyElement.style.paddingRight = `${modal.paddingSize}px`;
  }

  if (modal.overlayElement && modal.modalElement) {
    bodyElement.classList.add('modal-open');
    modal.overlayElement.classList.remove('hidden');
    modal.modalElement.style.outline = 'none';
    modal.modalElement.tabIndex = -1;
    modal.modalElement.focus();

    document.addEventListener('focus', modalElementFocusHandler, true);
    document.addEventListener('keydown', escKeydownHandler);

    if (modal.isOverlayClickable) {
      modal.overlayElement.addEventListener('click', overlayElementClickHandler);
    }

    if (modal.closeButton) {
      modal.closeButton.addEventListener('click', closeButtonClickHandler);
    }
  }

  if (modal.openModalCallback) {
    modal.openModalCallback();
  }
}

const initModal = (...args) => {
  [
    modal.modalElement,
    modal.closeButton,
    modal.overlayElement,
    modal.isOverlayClickable,
    modal.openModalCallback,
    modal.closeModalCallback,
  ] = [...args];

  openModal();
};

export {initModal, closeModal};
