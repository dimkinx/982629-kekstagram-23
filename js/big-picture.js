import {makeFragmentRender} from './util.js';

const  AvatarSize = {
  WIDTH: 35,
  HEIGHT: 35,
};

const bigPictureOverlayElement = document.querySelector('.big-picture.overlay');
const bigPictureModalElement = bigPictureOverlayElement.querySelector('.big-picture__preview');
const bigPictureCloseButton = bigPictureModalElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureModalElement.querySelector('.big-picture__img img');
const bigPictureCaptionElement = bigPictureModalElement.querySelector('.social__header .social__caption');
const bigPictureLikesCountElement = bigPictureModalElement.querySelector('.social__header .likes-count');
const bigPictureSocialCommentCountElement = bigPictureModalElement.querySelector('.social__comment-count');
const bigPictureCommentsCountElement = bigPictureSocialCommentCountElement.querySelector('.comments-count');
const bigPictureCommentsListElement = bigPictureModalElement.querySelector('.social__comments');
const bigPictureCommentsLoaderButton = bigPictureModalElement.querySelector('.comments-loader');


const createCommentAvatar = (data) => {
  const avatar = document.createElement('img');

  avatar.src = data.avatar;
  avatar.classList.add('social__picture');
  avatar.alt = data.name;
  avatar.width = AvatarSize.WIDTH;
  avatar.height = AvatarSize.HEIGHT;

  return avatar;
};

const createCommentText = (data) => {
  const text = document.createElement('p');

  text.classList.add('social__text');
  text.textContent = data.message;

  return text;
};

const createComment = (data) => {
  const comment = document.createElement('li');

  comment.classList.add('social__comment');
  comment.insertAdjacentElement('afterbegin', createCommentAvatar(data));
  comment.insertAdjacentElement('beforeend', createCommentText(data));

  return comment;
};

const getCommentFragment = makeFragmentRender(createComment);

const renderComments = (data) => {
  bigPictureCommentsListElement.innerHTML = '';
  bigPictureCommentsListElement.appendChild(getCommentFragment(data));
};

const updateBigPicture = (data) => {
  bigPictureImgElement.src = data.url;
  bigPictureCaptionElement.textContent = data.description;
  bigPictureLikesCountElement.textContent = data.likes;
  bigPictureCommentsCountElement.textContent = data.comments.length;

  renderComments(data.comments);
};

export {
  bigPictureOverlayElement,
  bigPictureModalElement,
  bigPictureCloseButton,
  bigPictureSocialCommentCountElement,
  bigPictureCommentsLoaderButton,
  updateBigPicture
};
