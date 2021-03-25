const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const interactiveTags = ['input', 'select', 'textarea', 'button'];

const switctInterctiveTags = (targetElement, disableActivity) => {
  interactiveTags.forEach((element) => {
    let elementsInTargetElement = targetElement.querySelectorAll(element);

    elementsInTargetElement.forEach((element) => {
      disableActivity ? element.disabled = true : element.disabled = false;
    });
  })
}

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  switctInterctiveTags(adForm, true);
  switctInterctiveTags(mapFilters, true);
}

const activateForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  switctInterctiveTags(adForm, false);
  switctInterctiveTags(mapFilters, false);
}

export { disableForms, activateForms };
