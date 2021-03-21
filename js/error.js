import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const onAlertEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeAlert();
  }
}

const closeAlert = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', onAlertEscKeydown);
}

const showSendDataErrorAlert = () => {
  errorMessage.style.zIndex = 1000;
  main.appendChild(errorMessage);

  errorMessage.addEventListener('click', () => closeAlert());
  document.addEventListener('keydown', onAlertEscKeydown);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeAlert();
  });
}


const showGetDataErrorAlert = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);
}

export { showSendDataErrorAlert, showGetDataErrorAlert };
