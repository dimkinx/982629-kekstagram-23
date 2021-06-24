import initModal from '../helpers/modal.js';

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadModalElement = document.querySelector('.img-upload__wrapper');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');

const isOverlayClickable = false;

const openModalClickHandler = () => initModal(
  imgUploadModalElement,
  imgUploadCloseButton,
  imgUploadOverlayElement,
  isOverlayClickable,
);

const uploadImg = () => imgUploadInputElement.addEventListener('change', openModalClickHandler);

export default uploadImg;
