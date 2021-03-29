const getRandomFloatNumber = function (min, max, simbolsNumberAfterPoint) {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Недопустимые параметры');
  }

  let randomFloatNumber = Math.random() * (max - min) + min;

  if (simbolsNumberAfterPoint) {
    return +randomFloatNumber.toFixed(simbolsNumberAfterPoint);
  }

  return randomFloatNumber;
}


const getRandomNumber = function (min, max) {
  return Math.round(getRandomFloatNumber(min, max));
}


const getRandomArrayElement = function (array) {
  let randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
}


const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { getRandomFloatNumber, getRandomNumber, getRandomArrayElement, isEscEvent };
