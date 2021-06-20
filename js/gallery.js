import {mockData} from './mock-data.js';
import {picturesElement, renderPictures} from './pictures.js';
import {initModal} from './modal.js';

const bigPictureModalElement = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModalElement.querySelector('.big-picture__cancel');

const showGallery = () => {
  renderPictures(mockData);

  const pictureLink = document.querySelector('.picture');
  const pictureImg = pictureLink.querySelector('.picture__img');

  const openModalClickHandler = (evt) => {
    if (evt.target.matches(pictureLink.tagName) || evt.target.matches(pictureImg.tagName)) {
      initModal(bigPictureModalElement, bigPictureCloseButton);
    }
  };

  picturesElement.addEventListener('click', openModalClickHandler);
};

export {showGallery};
