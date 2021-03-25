import './form.js';
import './upload-photo.js';
import { renderSimilarAds } from './map.js';
import { showGetDataErrorAlert } from './error.js';
import { getData } from './api.js';
import { setFilterListener } from './filter.js';

const onSuccessData = (ads) => {
  renderSimilarAds(ads);
  setFilterListener(ads);
};
const onFailData = (err) => showGetDataErrorAlert(`Не удалось получить данные с сервера. Ошибка: ${err}`);


getData(onSuccessData, onFailData);

