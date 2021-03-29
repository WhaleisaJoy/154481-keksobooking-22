const roomTypesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createFeatures = (array, element) => {
  let fragment = document.createDocumentFragment();
  const popupFeatures = element.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  array.forEach((element) => {
    let feature = document.createElement('li');
    feature.className = `popup__feature popup__feature--${element}`;
    fragment.appendChild(feature);
  });

  popupFeatures.appendChild(fragment);
}

const createPhotos = (array, element) => {
  let fragment = document.createDocumentFragment();
  const popupPhotos = element.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  array.forEach((element) => {
    let photo = document.createElement('img');
    photo.src = element;
    photo.className = 'popup__photo';
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    fragment.appendChild(photo);
  });

  popupPhotos.appendChild(fragment);
}

const removeEmptyChildren = (element) => {
  let children = element.children;

  for (let child of children) {
    if (!child.hasChildNodes() && child.tagName !== 'IMG') {
      child.remove();
    }
  }

  return element;
}

const createPopup = ({author, offer}) => {
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__avatar').src = author.avatar;
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popup.querySelector('.popup__type').textContent = roomTypesMap[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popup.querySelector('.popup__description').textContent = offer.description;

  createFeatures(offer.features, popup);
  createPhotos(offer.photos, popup);

  return removeEmptyChildren(popup);
}

export { createPopup };
