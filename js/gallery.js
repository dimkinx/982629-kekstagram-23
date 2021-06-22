import * as pictures from './pictures.js';
import {bigPictureCloseButton, bigPictureModalElement, bigPictureOverlayElement, updateBigPicture} from './big-picture.js';
import mockData from './mock-data.js';
import initModal from './modal.js';

const photosData = mockData;

const showGallery = () => {
  pictures.render(photosData);

  const pictureLink = pictures.container.querySelector('.picture');
  const pictureImg = pictureLink.querySelector('.picture__img');

  const openModalClickHandler = (evt) => {
    evt.preventDefault();

    const targetElement = evt.target;

    if (targetElement.matches(pictureLink.tagName) || targetElement.matches(pictureImg.tagName)) {
      const photoData = (targetElement.matches(pictureImg.tagName))
        ? photosData[targetElement.parentElement.dataset.index - 1]
        : photosData[targetElement.dataset.index - 1];

      updateBigPicture(photoData);
      initModal(bigPictureOverlayElement, bigPictureModalElement, bigPictureCloseButton);
    }
  };

  pictures.container.addEventListener('click', openModalClickHandler);
};

export default showGallery;
