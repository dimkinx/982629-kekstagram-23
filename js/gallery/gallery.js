import * as pictures from './pictures.js';
import updateBigPicture from './big-picture.js';
import mockData from '../data/mock-data.js';
import initModal from '../helpers/modal.js';
import {destroyCommentsLoader} from './comments.js';

const bigPictureOverlayElement = document.querySelector('.big-picture.overlay');
const bigPictureModalElement = bigPictureOverlayElement.querySelector('.big-picture__preview');
const bigPictureCloseButton = bigPictureModalElement.querySelector('.big-picture__cancel');

const isOverlayClickable = false;

const openModalClickHandler = (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.picture') || targetElement.matches('.picture__img')) {
    evt.preventDefault();

    const photoData = (targetElement.matches('.picture__img'))
      ? mockData[targetElement.parentElement.dataset.index - 1]
      : mockData[targetElement.dataset.index - 1];

    updateBigPicture(photoData);
    initModal(
      bigPictureModalElement,
      bigPictureCloseButton,
      bigPictureOverlayElement,
      isOverlayClickable,
      null,
      destroyCommentsLoader,
    );
  }
};

const showGallery = () => {
  pictures.render(mockData);
  pictures.containerElement.addEventListener('click', openModalClickHandler);
};

export default showGallery;
