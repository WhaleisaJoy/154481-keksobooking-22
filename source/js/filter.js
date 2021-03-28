/* global _:readonly */
import { renderSimilarAds, markersLayerGroup, SIMILAR_ADS_COUNT, defaultAds } from './map.js';

const mapFilterForm = document.querySelector('.map__filters');
const housingType = mapFilterForm.querySelector('#housing-type');
const housingPrice = mapFilterForm.querySelector('#housing-price');
const housingRooms = mapFilterForm.querySelector('#housing-rooms');
const housingGuests = mapFilterForm.querySelector('#housing-guests');
const housingFeatures = mapFilterForm.querySelector('#housing-features');

const DEFAULT_SELECT_OPTION = 'any';

const housingPriceMap = {
  low: 10000,
  high: 50000,
};

const RERENDER_DELAY = 500;

const filterType = (ad) => ad.offer.type === housingType.value || housingType.value === DEFAULT_SELECT_OPTION;

const filterPrice = (ad) => {
  switch (housingPrice.value) {
    case 'low':
      return ad.offer.price <= housingPriceMap.low;
    case 'middle':
      return ad.offer.price >= housingPriceMap.low && ad.offer.price <= housingPriceMap.high;
    case 'high':
      return ad.offer.price >= housingPriceMap.high;
    default:
      return true;
  }
};

const filterRooms = (ad) => ad.offer.rooms === parseInt(housingRooms.value, 10) || housingRooms.value === DEFAULT_SELECT_OPTION;
const filterGuests = (ad) => ad.offer.guests === parseInt(housingGuests.value, 10) || housingGuests.value === DEFAULT_SELECT_OPTION;

const filterFeatures = (ad) => {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }

  for (let checkedFeature of checkedFeatures) {
    if (!ad.offer.features.includes(checkedFeature.value)) {
      return false;
    }
  }

  return true;
};

const filterAds = (ads) => {
  let filteredAds = [];

  for (let ad of ads) {
    if (filterType(ad) &&
        filterPrice(ad) &&
        filterRooms(ad) &&
        filterGuests(ad) &&
        filterFeatures(ad) &&
        filteredAds.length <= SIMILAR_ADS_COUNT) {
      filteredAds.push(ad);
    }
  }

  return filteredAds;
}

const resetFilterForm = () => {
  mapFilterForm.reset();
  renderSimilarAds(defaultAds);
}



const setFilterListener = (ads) => {
  mapFilterForm.addEventListener(('change'), _.debounce(
    () => {
      let filteredAds = filterAds(ads);

      markersLayerGroup.clearLayers();
      renderSimilarAds(filteredAds);
    },
    RERENDER_DELAY,
  ));
}

export { setFilterListener, resetFilterForm };

