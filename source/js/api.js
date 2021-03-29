const SERVER_LINK = 'https://22.javascript.pages.academy/keksobooking';



const getData = (onSuccess, onFail) => {
  fetch(`${SERVER_LINK}/data`)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => onFail(err));
}

const sendData = (onSuccess, onFail, method, body) => {
  fetch(
    SERVER_LINK,
    {
      method,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((err) => {
      onFail(err);
    });
}

export { getData, sendData };
