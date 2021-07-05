import {initModal, closeModal} from '../helpers/modal.js';
import {initImgEditor, destroyImgEditor} from './img-editor.js';
import {
  hashtagsInputElement,
  descriptionTextareaElement,
  initValidation,
  destroyValidation
} from './text-validator.js';
import {postData} from '../data/data.js';
import {showSuccessMessage, showErrorMessage} from '../data/messages.js';

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadModalElement = imgUploadOverlayElement.querySelector('.img-upload__wrapper');
const imgUploadCloseButtonElement = imgUploadModalElement.querySelector('.img-upload__cancel');

const isOverlayClickable = false;

const dataSuccessHandler = () => {
  closeModal();
  showSuccessMessage();
};

const dataErrorHandler = () => {
  closeModal();
  showErrorMessage();
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);

  postData(dataSuccessHandler, dataErrorHandler, formData);
};

const submitForm = () => {
  imgUploadFormElement.addEventListener('submit', formSubmitHandler);
};

const openModalCallback = () => {
  initImgEditor();
  initValidation();
  submitForm();
};

const closeModalCallback = () => {
  destroyImgEditor();
  destroyValidation();
  imgUploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionTextareaElement.value = '';
  imgUploadFormElement.removeEventListener('submit', formSubmitHandler);
};

const openModalClickHandler = () => {
  (!imgUploadInputElement.files[0].type.includes('image'))
    ? imgUploadInputElement.setCustomValidity('Выбранный файл не является изображением')
    : imgUploadInputElement.setCustomValidity('');

  return (!imgUploadInputElement.validity.valid)
    ? imgUploadInputElement.reportValidity()
    : initModal(
      imgUploadModalElement,
      imgUploadCloseButtonElement,
      imgUploadOverlayElement,
      isOverlayClickable,
      openModalCallback,
      closeModalCallback,
    );
};

const initImgUploader = () => imgUploadInputElement.addEventListener('change', openModalClickHandler);

export default initImgUploader;
