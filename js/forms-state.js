const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const interactiveTags = ['input', 'select', 'textarea', 'button'];

const switctInterctiveNags = (targetElement, disableActivity) => {
  interactiveTags.forEach((element) => {
    let elementsInTargetElement = targetElement.querySelectorAll(element);

    elementsInTargetElement.forEach((element) => {
      disableActivity ? element.disable = true : element.disable = false;
    });
  })
}

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  switctInterctiveNags(adForm, true);
  switctInterctiveNags(mapFilters, true);
}

const activateForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  switctInterctiveNags(adForm, false);
  switctInterctiveNags(mapFilters, false);
}

export { disableForms, activateForms };
