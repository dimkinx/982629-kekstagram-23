import initModal from '../helpers/modal.js';
import {initImgEditor, destroyImgEditor} from './img-editor.js';
import {
  hashtagsInputElement,
  descriptionTextareaElement,
  initValidation,
  destroyValidation
} from './text-validator.js';

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadModalElement = imgUploadOverlayElement.querySelector('.img-upload__wrapper');
const imgUploadCloseButton = imgUploadModalElement.querySelector('.img-upload__cancel');

const isOverlayClickable = false;

const openModalCallback = () => {
  initImgEditor();
  initValidation();
};

const closeModalCallback = () => {
  destroyImgEditor();
  destroyValidation();
  imgUploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionTextareaElement.value = '';
};

const openModalClickHandler = () => {
  (!imgUploadInputElement.files[0].type.includes('image'))
    ? imgUploadInputElement.setCustomValidity('Выбранный файл не является изображением')
    : imgUploadInputElement.setCustomValidity('');

  return (!imgUploadInputElement.validity.valid)
    ? imgUploadInputElement.reportValidity()
    : initModal(
      imgUploadModalElement,
      imgUploadCloseButton,
      imgUploadOverlayElement,
      isOverlayClickable,
      openModalCallback,
      closeModalCallback,
    );
};

const initImgUploader = () => imgUploadInputElement.addEventListener('change', openModalClickHandler);

export default initImgUploader;
