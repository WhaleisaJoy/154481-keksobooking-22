import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const onAlertEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeAlert();
  }
}

const closeAlert = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onAlertEscKeydown);
}

const showSendDataSuccessAlert = () => {
  successMessage.style.zIndex = 1000;
  main.appendChild(successMessage);

  successMessage.addEventListener('click', () => closeAlert());
  document.addEventListener('keydown', onAlertEscKeydown);
}

export { showSendDataSuccessAlert };
