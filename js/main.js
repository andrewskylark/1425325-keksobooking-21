'use strict';

const map = document.querySelector(`.map`);
const fragment = document.createDocumentFragment();
const pinsWrapper = map.querySelector(`.map__pins`);

const GET_AVATAR_URL = function (number) {
  return `img/avatars/user0${number}.png`;
};
// const AVATAR_NUMBER = {
//   min: 1,
//   max: 8
// };
const GET_ADDRESS = function (x, y) {
  return `${x}, ${y}`;
}
const PRICE = {
  min: 50,
  max: 150
};
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION = {
  x:{
    min: 0,
    max: map.getBoundingClientRect().right
  },
  y:{
    min: 130,
    max: 630
  },
};
const PIN = {
  x: 25,
  y: 70
}
const PINS_COUNT = 8;

const getRandomFromArray = function (array) {
  return array[getRandom(0, array.length - 1)];
};
const shuffleArray = function (array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};
const getRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
};
const showMap = function () {
  map.classList.remove(`map--faded`);
};
const renderPins = function () {
  for (let i = 0; i < PINS_COUNT; i++) {
    fragment.append(getPin(i + 1));
  }
  pinsWrapper.append(fragment);
};
const getPin = function (number) {
  const pinData = getPinData(number);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
  const avatar = pinTemplate.querySelector(`img`);

  avatar.src = pinData.author.avatar;
  avatar.alt = `заголовок объявления`;
  pinTemplate.style.left = `${pinData.location.x - (PIN.x / 2)}px`;
  pinTemplate.style.top = `${pinData.location.y - PIN.y}px`;

  return pinTemplate;
}

const getPinData = function (number) {
  const x = getRandom(LOCATION.x.min, LOCATION.x.max);
  const y = getRandom(LOCATION.y.min, LOCATION.y.max);
  const features = shuffleArray(FEATURES).slice(1, getRandom(1, FEATURES.length - 1));
  const photos = shuffleArray(PHOTOS).slice(1, getRandom(1, PHOTOS.length - 1));

  return {
    author: {
        // avatar: GET_AVATAR_URL(getRandom(AVATAR_NUMBER.min, AVATAR_NUMBER.max))
        avatar: GET_AVATAR_URL(number)
    },
    offer: {
        title: '',
        address: GET_ADDRESS(x, y),
        price: getRandom(PRICE.min, PRICE.max),
        type: getRandomFromArray(TYPES),
        rooms: getRandomFromArray(ROOMS),
        guests: getRandomFromArray(GUESTS),
        checkin: getRandomFromArray(CHECKINS),
        checkout: getRandomFromArray(CHECKOUTS),
        features,
        description: '',
        photos
    },
    location: {
      x,
      y
    }
  }
}
showMap();
renderPins();
