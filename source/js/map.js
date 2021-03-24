/* global L:readonly */
import { disableForms, activateForms } from './forms-state.js';
import { createPopup } from './popup.js';

const INITIAL_LAT = 35.6828;
const INITIAL_LNG = 139.7594;
const MAP_ZOOM = 10;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const MARKER_SIZE = [40, 40];
const MARKER_ANCHOR = [20, 40];
const SIMILAR_ADS_COUNT = 10;

const addressInput = document.querySelector('#address');

const setAddress = () => {
  let {lat, lng} = mainPinMarker.getLatLng();
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng([INITIAL_LAT, INITIAL_LNG]);
  setAddress();
}



disableForms();

addressInput.setAttribute('readonly', 'readonly');

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);



const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

if (mainPinMarker) { setAddress() }
mainPinMarker.on('moveend', () => setAddress());



const markersLayerGroup = L.layerGroup();

const renderSimilarAds = (ads) => {
  ads
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach((ad) => {
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: MARKER_SIZE,
        iconAnchor: MARKER_ANCHOR,
      });

      const marker = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng,
        },
        {
          icon: icon,
        },
      );

      marker.bindPopup(createPopup(ad));
      markersLayerGroup
        .addLayer(marker)
        .addTo(map);
    });
}

export { renderSimilarAds, resetMainPinMarker, markersLayerGroup, SIMILAR_ADS_COUNT }
