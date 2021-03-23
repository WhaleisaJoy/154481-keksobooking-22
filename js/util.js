const getRandomFloatNumber = function (min, max, simbolsNumberAfterPoint) {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Недопустимые параметры');
  }

  let randomFloatNumber = Math.random() * (max - min) + min;

  if (simbolsNumberAfterPoint) {
    let randomFloatNumberFixed = +randomFloatNumber.toFixed(simbolsNumberAfterPoint);
    return randomFloatNumberFixed;
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


const getRandomUniqArray = function (array) {
  let newArrayRandomLength = getRandomNumber(1, array.length);
  let newArray = [];

  while (newArray.length < newArrayRandomLength) {
    let randomArrayElement = getRandomArrayElement(array);

    while (newArray.includes(randomArrayElement)) {
      randomArrayElement = getRandomArrayElement(array);
    }

    newArray.push(randomArrayElement);
  }

  return newArray;
}


const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { getRandomFloatNumber, getRandomNumber, getRandomArrayElement, getRandomUniqArray, isEscEvent };
