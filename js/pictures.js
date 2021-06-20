const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture');

const createPicture = (data) => {
  const picture = pictureTemplateElement.content.cloneNode(true);

  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__likes').textContent = data.likes;
  picture.querySelector('.picture__comments').textContent = data.comments.length;

  return picture;
};

const makeFragmentRender = (render) => (dataList) => {
  const fragment = document.createDocumentFragment();

  dataList.forEach((data) => {
    fragment.appendChild(render(data));
  });

  return fragment;
};

const getPictureFragment = makeFragmentRender(createPicture);

const renderPictures = (data) => {
  picturesElement.appendChild(getPictureFragment(data));
};

export {picturesElement, renderPictures};
