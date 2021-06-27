import * as pictures from './pictures.js';
import {bigPictureCloseButton, bigPictureModalElement, bigPictureOverlayElement, updateBigPicture} from './big-picture.js';
import mockData from '../data/mock-data.js';
import initModal from '../helpers/modal.js';

const photosData = mockData;
const isOverlayClickable = false;

const openModalClickHandler = (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.picture') || targetElement.matches('.picture__img')) {
    evt.preventDefault();

    const photoData = (targetElement.matches('.picture__img'))
      ? photosData[targetElement.parentElement.dataset.index - 1]
      : photosData[targetElement.dataset.index - 1];

    updateBigPicture(photoData);
    initModal(
      bigPictureModalElement,
      bigPictureCloseButton,
      bigPictureOverlayElement,
      isOverlayClickable,
    );
  }
};

const showGallery = () => {
  pictures.render(photosData);
  pictures.containerElement.addEventListener('click', openModalClickHandler);
};

export default showGallery;
