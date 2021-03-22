import './form.js';
import { renderSimilarAds } from './map.js';
import { showGetDataErrorAlert } from './error.js';
import { getData } from './api.js';

const SIMILAR_ADS_COUNT = 10;

const onSuccessData = (ads) => renderSimilarAds(ads.slice(0, SIMILAR_ADS_COUNT));
const onFailData = (err) => showGetDataErrorAlert(`Не удалось получить данные с сервера. Ошибка: ${err}`);


getData(onSuccessData, onFailData);

