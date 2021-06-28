import {makeFragmentRender} from '../helpers/util.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture');
const pictureElement = pictureTemplateElement.content.querySelector('.picture');

const createPicture = (data) => {
  const picture = pictureElement.cloneNode(true);

  picture.dataset.index = data.id;
  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__likes').textContent = data.likes;
  picture.querySelector('.picture__comments').textContent = data.comments.length;

  return picture;
};

const getPictureFragment = makeFragmentRender(createPicture);

const renderPictures = (data) => {
  picturesContainerElement.appendChild(getPictureFragment(data));
};

export {
  picturesContainerElement as containerElement,
  renderPictures as render
};
