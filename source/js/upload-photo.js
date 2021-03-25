const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
const IMAGES_SIZE = 70;

const avatarFileChooser = document.querySelector('#avatar');
const avatarImg = document.querySelector('.ad-form-header__preview img');
const imagesFileChooser = document.querySelector('#images');
const imagesContainer = document.querySelector('.ad-form__photo');

const resetPhotos = () => {
  avatarImg.src = DEFAULT_AVATAR_SRC;
  imagesContainer.innerHTML = '';
}



avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarImg.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

imagesFileChooser.addEventListener('change', () => {
  const file = imagesFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (imagesContainer.children.length === 0) {
        let photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = IMAGES_SIZE;
        photo.height = IMAGES_SIZE;
        photo.alt = 'Фотография жилья';
        imagesContainer.appendChild(photo);
      } else {
        let photo = imagesContainer.children[0];
        photo.src = reader.result;
      }
    });

    reader.readAsDataURL(file);
  }
});

export { resetPhotos };
