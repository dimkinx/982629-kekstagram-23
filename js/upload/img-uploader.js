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
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadModalElement = imgUploadOverlayElement.querySelector('.img-upload__wrapper');
const imgUploadCloseButtonElement = imgUploadModalElement.querySelector('.img-upload__cancel');

const reader = new FileReader();

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
  postData(dataSuccessHandler, dataErrorHandler, new FormData(evt.currentTarget));
};

const readerLoadHandler = () => imgUploadPreviewElement.src = reader.result;

const addPreviewImg = () => {
  reader.addEventListener('load', readerLoadHandler);
  reader.readAsDataURL(imgUploadInputElement.files[0]);
};

const openModalCallback = () => {
  addPreviewImg();
  initImgEditor();
  initValidation();
  imgUploadFormElement.addEventListener('submit', formSubmitHandler);
};

const closeModalCallback = () => {
  destroyImgEditor();
  destroyValidation();
  imgUploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionTextareaElement.value = '';
  reader.removeEventListener('load', readerLoadHandler);
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
      false,
      openModalCallback,
      closeModalCallback,
    );
};

const initImgUploader = () => imgUploadInputElement.addEventListener('change', openModalClickHandler);

export default initImgUploader;
