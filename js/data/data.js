const getData = (successHandler, errorHandler) => fetch(
  'https://23.javascript.pages.academy/kekstagram/data',
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => successHandler(data))
  .catch((err) => errorHandler(err));

const postData = (successHandler, errorHandler, formData) => fetch(
  'https://23.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then(() => successHandler())
  .catch((err) => errorHandler(err));

export {getData, postData};
