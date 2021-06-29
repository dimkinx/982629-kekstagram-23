import {makeFragmentRender} from '../helpers/util.js';

const commentCountElement = document.querySelector('.social__comment-count');
const commentsListElement = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');

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
