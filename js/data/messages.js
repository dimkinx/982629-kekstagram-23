import {initModal} from '../helpers/modal.js';

const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

const isOverlayClickable = true;

const closeModalCallback = (element) => () => element.remove();

const showSuccessMessage = () => {
  document.body.appendChild(successTemplateElement.content.cloneNode(true));

  const successOverlayElement = document.querySelector('.success');
  const successModalElement = successOverlayElement.querySelector('.success__inner');
  const successButtonElement = successOverlayElement.querySelector('.success__button');

  if (successOverlayElement) {
    initModal(
      successModalElement,
      successButtonElement,
      successOverlayElement,
      isOverlayClickable,
      null,
      closeModalCallback(successOverlayElement),
    );
  }
};

const showErrorMessage = (err) => {
  const errorElement = errorTemplateElement.content.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorOverlayElement = document.querySelector('.error');
  const errorModalElement = errorOverlayElement.querySelector('.error__inner');
  const errorTitleElement = errorOverlayElement.querySelector('.error__title');
  const errorButtonElement = errorOverlayElement.querySelector('.error__button');

  if (err) {
    errorTitleElement.textContent = err;
    errorButtonElement.textContent = 'Ок';
  }

  if (errorOverlayElement) {
    initModal(
      errorModalElement,
      errorButtonElement,
      errorOverlayElement,
      isOverlayClickable,
      null,
      closeModalCallback(errorOverlayElement),
    );
  }
};

export {showSuccessMessage, showErrorMessage};
