import * as pictures from './pictures.js';
import * as bigPicture from './big-picture.js';
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

      bigPicture.update(photoData);

      initModal(bigPicture.overlayElement, bigPicture.modalElement, bigPicture.closeButton);

      bigPicture.socialCommentCountElement.classList.add('hidden');
      bigPicture.socialCommentsLoaderButton.classList.add('hidden');
    }
  };

  pictures.container.addEventListener('click', openModalClickHandler);
};

export default showGallery;
