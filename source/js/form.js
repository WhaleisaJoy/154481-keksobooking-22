import { resetMainPinMarker } from './map.js';
import { showSendDataSuccessAlert } from './success.js';
import { showSendDataErrorAlert } from './error.js';
import { sendData } from './api.js'
import { resetPhotos } from './upload-photo.js';
import { resetFilterForm } from './filter.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const typePriceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const PRICE_MAX_LENGTH = 1000000;

const roomsCapacityMap = {
  1: {
    permissibleCapacity: ['1'],
    errorMsg: 'Можно выбрать только 1 гостя',
  },
  2: {
    permissibleCapacity: ['1', '2'],
    errorMsg: 'Можно выбрать 1 или 2 гостя',
  },
  3: {
    permissibleCapacity: ['1', '2', '3'],
    errorMsg: 'Можно выбрать 1, 2 или 3 гостя',
  },
  100: {
    permissibleCapacity: ['0'],
    errorMsg: 'Выранное количество комнат предназначено не для гостей',
  },
};

const setDefaultPrice = () => {
  const minPrice = typePriceMap[type.value];

  price.placeholder = minPrice;
  price.min = minPrice;
}

const setDefaultCapacity = () => {
  const permissibleCapacity = roomsCapacityMap[roomNumber.value].permissibleCapacity;

  if (!permissibleCapacity.includes(capacity.value)) {
    capacity.value = permissibleCapacity[0];
  }
}

const checkRoomsCapacity = () => {
  const permissibleCapacity = roomsCapacityMap[roomNumber.value].permissibleCapacity;
  const selectedCapacity = capacity.value;
  const errorMsg = roomsCapacityMap[roomNumber.value].errorMsg;

  if (!permissibleCapacity.includes(selectedCapacity)) {
    capacity.setCustomValidity(errorMsg);
  } else {
    capacity.setCustomValidity('');
  }
}

const setAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const onSuccess = () => {
      resetAdForm();
      showSendDataSuccessAlert();
    }
    const onFail = (err) => showSendDataErrorAlert(err);
    const method = 'POST';
    const formData = new FormData(evt.target);

    sendData(
      onSuccess,
      onFail,
      method,
      formData,
    );
  });
}

const resetAdForm = () => {
  adForm.reset();
  resetMainPinMarker();
  resetPhotos();
  setDefaultPrice();
  setDefaultCapacity();
  resetFilterForm();
}



setDefaultPrice();
setDefaultCapacity();

titleInput.addEventListener('input', () => {
  const titleLength = titleInput.value.length;

  if (titleLength < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity(`Еще ${TITLE_MIN_LENGTH - titleLength} симв.`);
  } else if (titleLength > TITLE_MAX_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${titleLength - TITLE_MAX_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


price.addEventListener('input', () => {
  const priceLength = price.value.length;
  const priceCurrent = price.value;
  const typeMinPriceValue = typePriceMap[type.value];

  if (priceCurrent < typeMinPriceValue) {
    price.setCustomValidity(`Минимальная цена для указанного типа жилья: ${typeMinPriceValue}`);
  } else if (priceLength > PRICE_MAX_LENGTH) {
    price.setCustomValidity(`Удалите лишние ${priceLength - PRICE_MAX_LENGTH} симв.`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});


type.addEventListener('change', setDefaultPrice);


timeIn.addEventListener('change', () => timeOut.selectedIndex = timeIn.selectedIndex);
timeOut.addEventListener('change', () => timeIn.selectedIndex = timeOut.selectedIndex);


roomNumber.addEventListener('change', checkRoomsCapacity);
capacity.addEventListener('change', checkRoomsCapacity);


setAdFormSubmit();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
});

