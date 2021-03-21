import { isEscEvent } from './util.js';

const main = document.querySelector('main');

const onAlertEscKeydown = (evt, alertContainer) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeAlert(alertContainer);
  }
}

const closeAlert = (alertContainer) => {
  alertContainer.remove();
  document.removeEventListener('keydown', (evt) => onAlertEscKeydown(evt, alertContainer));
}


const showAlert = (alertContainer) => {
  alertContainer.style.zIndex = 1000;
  main.appendChild(alertContainer);

  alertContainer.addEventListener('click', () => closeAlert(alertContainer));
  document.addEventListener('keydown', (evt) => onAlertEscKeydown(evt, alertContainer));

  if (alertContainer.className === 'error__alertContainer') {
    const errorButton = alertContainer.querySelector('.error__button');
    errorButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeAlert(alertContainer);
    })
  }
}


const showSimpleAlert = (message) => {
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

export { showAlert, showSimpleAlert };
