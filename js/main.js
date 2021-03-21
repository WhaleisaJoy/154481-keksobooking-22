import './form.js';
import { renderSimilarAds } from './map.js';
import { getData } from './api.js';
//import { showGetDataError } from './util.js';
import { showSimpleAlert } from './alerts.js';

const SIMILAR_ADS_COUNT = 10;

const onSuccessData = (ads) => renderSimilarAds(ads.slice(0, SIMILAR_ADS_COUNT));
//const onFailData = () => showGetDataError('Не удалось получить данные с сервера');
const onFailData = () => showSimpleAlert('Не удалось получить данные с сервера');


getData(onSuccessData, onFailData);

