const Request = {
  Get: {
    URL: 'https://23.javascript.pages.academy/kekstagram/data',
    METHOD: 'GET',
  },
  Post: {
    URL: 'https://23.javascript.pages.academy/kekstagram',
    METHOD: 'POST',
  },
};

const createRequest = (url, method, successHandler, errorHandler, formData) => fetch(
  url,
  {
    method: method,
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then(successHandler)
  .catch(errorHandler);

const getData = (successHandler, errorHandler) => createRequest(
  Request.Get.URL,
  Request.Get.METHOD,
  successHandler,
  errorHandler,
);

const postData = (successHandler, errorHandler, formData) => createRequest(
  Request.Post.URL,
  Request.Post.METHOD,
  successHandler,
  errorHandler,
  formData,
);

export {getData, postData};
