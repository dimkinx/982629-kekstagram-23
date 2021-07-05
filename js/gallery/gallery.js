import * as pictures from './pictures.js';
import updateBigPicture from './big-picture.js';
import {initModal} from '../helpers/modal.js';
import {destroyCommentsLoader} from './comments.js';
import {getData} from '../data/data.js';
import {showErrorMessage} from '../data/messages.js';

const bigPictureOverlayElement = document.querySelector('.big-picture.overlay');
const bigPictureModalElement = bigPictureOverlayElement.querySelector('.big-picture__preview');
const bigPictureCloseButton = bigPictureModalElement.querySelector('.big-picture__cancel');

const isOverlayClickable = false;

const openModalClickHandler = (data) => (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.picture') || targetElement.matches('.picture__img')) {
    evt.preventDefault();

    const photoData = (targetElement.matches('.picture__img'))
      ? data[targetElement.parentElement.dataset.index]
      : data[targetElement.dataset.index];

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

const dataSuccessHandler = (data) => {
  pictures.render(data);
  pictures.containerElement.addEventListener('click', openModalClickHandler(data));
};

const dataErrorHandler = (err) => showErrorMessage(err);

const showGallery = () => getData(dataSuccessHandler, dataErrorHandler);

export default showGallery;
