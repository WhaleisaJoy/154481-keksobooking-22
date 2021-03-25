const ROOM_TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createFeatures = (array, elememt) => {
  let fragment = document.createDocumentFragment();
  const popupFeatures = elememt.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  array.forEach((elememt) => {
    let feature = document.createElement('li');
    feature.className = `popup__feature popup__feature--${elememt}`;
    fragment.appendChild(feature);
  });

  popupFeatures.appendChild(fragment);
}

const createPhotos = (array, elememt) => {
  let fragment = document.createDocumentFragment();
  const popupPhotos = elememt.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  array.forEach((elememt) => {
    let photo = document.createElement('img');
    photo.src = elememt;
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
  popup.querySelector('.popup__type').textContent = ROOM_TYPES_MAP[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popup.querySelector('.popup__description').textContent = offer.description;

  createFeatures(offer.features, popup);
  createPhotos(offer.photos, popup);

  return removeEmptyChildren(popup);
}

export { createPopup };
