import {showComments} from './comments.js';

const bigPictureImgElement = document.querySelector('.big-picture__img img');
const bigPictureCaptionElement = document.querySelector('.social__header .social__caption');
const bigPictureCommentsCountElement = document.querySelector('.comments-count');
const bigPictureLikesCountElement = document.querySelector('.social__header .likes-count');

const updateBigPicture = (data) => {
  bigPictureImgElement.src = data.url;
  bigPictureCaptionElement.textContent = data.description;
  bigPictureLikesCountElement.textContent = data.likes;
  bigPictureCommentsCountElement.textContent = data.comments.length;

  showComments(data.comments);
};

export default updateBigPicture;
