import {makeFragmentRender} from '../helpers/util.js';

const  AvatarSize = {
  WIDTH: 35,
  HEIGHT: 35,
};

const Comments = {
  shownData: [],
  shownNum: 0,
  allNum: 0,
  INCREMENT: 5,
};

const commentCountElement = document.querySelector('.social__comment-count');
const commentsListElement = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');

const createCommentAvatar = ({avatar, name}) => {
  const avatarElement = document.createElement('img');

  avatarElement.src = avatar;
  avatarElement.classList.add('social__picture');
  avatarElement.alt = name;
  avatarElement.width = AvatarSize.WIDTH;
  avatarElement.height = AvatarSize.HEIGHT;

  return avatarElement;
};

const createCommentText = ({message}) => {
  const textElement = document.createElement('p');

  textElement.classList.add('social__text');
  textElement.textContent = message;

  return textElement;
};

const createComment = (data) => {
  const commentElement = document.createElement('li');

  commentElement.classList.add('social__comment');
  commentElement.insertAdjacentElement('afterbegin', createCommentAvatar(data));
  commentElement.insertAdjacentElement('beforeend', createCommentText(data));

  return commentElement;
};

const getCommentFragment = makeFragmentRender(createComment);

const renderComments = (data) => commentsListElement.appendChild(getCommentFragment(data));

const updateCountComments = (shown, all) => commentCountElement
  .innerHTML = `${shown} из <span class="comments-count">${all}</span> комментариев`;

const commentsLoaderButtonClickHandler = () => updateComments();

const initCommentsLoader = () => {
  if (Comments.shownData.length <= Comments.INCREMENT) {
    Comments.shownNum = Comments.allNum;
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', commentsLoaderButtonClickHandler);
  } else {
    Comments.shownNum += Comments.INCREMENT;
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);
  }
};

function updateComments() {
  initCommentsLoader();
  updateCountComments(Comments.shownNum, Comments.allNum);
  renderComments(Comments.shownData.splice(0, Comments.INCREMENT));
}

const showComments = (data) => {
  Comments.shownData = [...data];
  Comments.shownNum = 0;
  Comments.allNum = data.length;
  commentsListElement.innerHTML = '';
  updateComments();
};

const destroyCommentsLoader = () => commentsLoaderButton.removeEventListener('click', commentsLoaderButtonClickHandler);

export {showComments, destroyCommentsLoader};
