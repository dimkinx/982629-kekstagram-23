import initModal from '../helpers/modal.js';
import {
  hashtagsInputElement,
  descriptionTextareaElement,
  initHashtagValidation,
  destroyHashtagValidation
} from './hashtag-validation.js';

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadModalElement = imgUploadOverlayElement.querySelector('.img-upload__wrapper');
const imgUploadCloseButton = imgUploadModalElement.querySelector('.img-upload__cancel');

const isOverlayClickable = false;

const openModalCallback = () => {
  initHashtagValidation();
};

const closeModalCallback = () => {
  destroyHashtagValidation();
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

const uploadImg = () => imgUploadInputElement.addEventListener('change', openModalClickHandler);

export default uploadImg;
