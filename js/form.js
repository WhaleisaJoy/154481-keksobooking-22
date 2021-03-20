const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const TYPE_PRICE_MAP = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const PRICE_MAX_LENGTH = 1000000;

const ROOMS_CAPACITY_MAP = {
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

const checkRoomsCapacity = () => {
  const permissibleCapacity = ROOMS_CAPACITY_MAP[roomNumber.value].permissibleCapacity;
  const selectedCapacity = capacity.value;
  const errorMsg = ROOMS_CAPACITY_MAP[roomNumber.value].errorMsg;

  if (!permissibleCapacity.includes(selectedCapacity)) {
    capacity.setCustomValidity(errorMsg);
  } else {
    capacity.setCustomValidity('');
  }
}



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
  const typeMinPriceValue = TYPE_PRICE_MAP[type.value];

  if (priceCurrent < typeMinPriceValue) {
    price.setCustomValidity(`Минимальная цена для указанного типа жилья: ${typeMinPriceValue}`);
  } else if (priceLength > PRICE_MAX_LENGTH) {
    price.setCustomValidity(`Удалите лишние ${priceLength - PRICE_MAX_LENGTH} симв.`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});


type.addEventListener('change', () => {
  const minPrice = TYPE_PRICE_MAP[type.value];

  price.placeholder = minPrice;
  price.min = minPrice;
});


timeIn.addEventListener('change', () => timeOut.selectedIndex = timeIn.selectedIndex);
timeOut.addEventListener('change', () => timeIn.selectedIndex = timeOut.selectedIndex);


roomNumber.addEventListener('change', checkRoomsCapacity);
capacity.addEventListener('change', checkRoomsCapacity);



















/*const capacityOptions = capacity.querySelectorAll('option');

const disableInaccessibleCapacityOptions = () => {
  capacityOptions.forEach((option) => {
    if (roomNumber.value === '100') {
      option.value === '0' ? option.disabled = false : option.disabled = true;
    } else if (option.value > roomNumber.value || option.value === '0') {
      option.disabled = true;
    }
  });
}*/

/*disableInaccessibleCapacityOptions();

roomNumber.addEventListener('change', () => {
  capacityOptions.forEach((option) => option.disabled = false);
  disableInaccessibleCapacityOptions();

  console.log(capacityOptions[capacity.selectedIndex]);
});


adForm.addEventListener('submit', (evt) => {
  console.log(1);
  console.log(capacityOptions[capacity.selectedIndex]);
  if (capacityOptions[capacity.selectedIndex].disabled) {
    evt.preventDefault();
    capacity.setCustomValidity('Недопустимое количество гостей');
  } else {
    capacity.setCustomValidity('');
  }
  // capacity.reportValidity();
});*/
