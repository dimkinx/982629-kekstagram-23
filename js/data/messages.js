import {initModal} from '../helpers/modal.js';

const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

const closeModalCallback = (element) => () => element.remove();

const showSuccessMessage = () => {
  document.body.appendChild(successTemplateElement.content.cloneNode(true));

  const successOverlayElement = document.querySelector('.success');

  if (successOverlayElement) {
    initModal(
      successOverlayElement.querySelector('.success__inner'),
      successOverlayElement.querySelector('.success__button'),
      successOverlayElement,
      true,
      null,
      closeModalCallback(successOverlayElement),
    );
  }
};

const showErrorMessage = (error) => {
  document.body.appendChild(errorTemplateElement.content.cloneNode(true));

  const errorOverlayElement = document.querySelector('.error');

  if (errorOverlayElement) {
    const errorButtonElement = errorOverlayElement.querySelector('.error__button');

    if (error) {
      errorOverlayElement.querySelector('.error__title').textContent = error;
      errorButtonElement.textContent = 'Ок';
    }

    initModal(
      errorOverlayElement.querySelector('.error__inner'),
      errorButtonElement,
      errorOverlayElement,
      true,
      null,
      closeModalCallback(errorOverlayElement),
    );
  }
};

export {showSuccessMessage, showErrorMessage};
