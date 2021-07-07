const GetRequest = {
  URL: 'https://23.javascript.pages.academy/kekstagram/data',
  METHOD: 'GET',
};

const PostRequest = {
  URL: 'https://23.javascript.pages.academy/kekstagram',
  METHOD: 'POST',
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
  GetRequest.URL,
  GetRequest.METHOD,
  successHandler,
  errorHandler,
);

const postData = (successHandler, errorHandler, formData) => createRequest(
  PostRequest.URL,
  PostRequest.METHOD,
  successHandler,
  errorHandler,
  formData,
);

export {getData, postData};
