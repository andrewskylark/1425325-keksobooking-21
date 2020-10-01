'use strict';

const map = document.querySelector(`.map`);
const fragment = document.createDocumentFragment();
const pinsWrapper = map.querySelector(`.map__pins`);

const getAvatarUrl = function (number) {
  return `img/avatars/user0${number + 1}.png`;
};

const getAddress = function (x, y) {
  return `${x}, ${y}`;
};
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
  x: {
    min: 0,
    max: map.getBoundingClientRect().right
  },
  y: {
    min: 130,
    max: 630
  },
};
const PIN = {
  x: 50,
  y: 70
};
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
  return Math.floor(min + Math.random() * (max + 1 - min));
};
const showMap = function () {
  map.classList.remove(`map--faded`);
};

const getPinData = function (number) {
  const x = getRandom(LOCATION.x.min, LOCATION.x.max);
  const y = getRandom(LOCATION.y.min, LOCATION.y.max);
  const features = shuffleArray(FEATURES).slice(0, getRandom(1, FEATURES.length));
  const photos = shuffleArray(PHOTOS).slice(0, getRandom(1, PHOTOS.length));

  return {
    author: {
      // avatar: getAvatarUrl(getRandom(AVATAR_NUMBER.min, AVATAR_NUMBER.max))
      avatar: getAvatarUrl(number)
    },
    offer: {
      title: ``,
      address: getAddress(x, y),
      price: getRandom(PRICE.min, PRICE.max),
      type: getRandomFromArray(TYPES),
      rooms: getRandomFromArray(ROOMS),
      guests: getRandomFromArray(GUESTS),
      checkin: getRandomFromArray(CHECKINS),
      checkout: getRandomFromArray(CHECKOUTS),
      features,
      description: ``,
      photos
    },
    location: {
      x,
      y
    }
  };
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
};
const renderPins = function () {
  for (let i = 0; i < PINS_COUNT; i++) {
    fragment.append(getPin(i));
  }
  pinsWrapper.append(fragment);
};
showMap();
renderPins();

const getCardType = function (object) {
  switch (object.offer.type) {
    case `flat`:
      return `квартира`;
    case `house`:
      return `дом`;
    case `bungalow`:
      return `бунгало`;
    case `palace`:
      return `дворец`;
    default:
      return `unknown`;
  }
};
const fillCard = function (number) {
  const pinData = getPinData(number);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`).cloneNode(true);
  const avatar = cardTemplate.querySelector(`img`);
  const featuresContainer = cardTemplate.querySelector(`.popup__features`);
  const features = featuresContainer.querySelectorAll(`.popup__feature`);
  const pinsClasses = pinData.offer.features;
  const btnClose = cardTemplate.querySelector(`.popup__close`);
  const onBtnClose = function () {
    cardTemplate.remove();
  };
  btnClose.addEventListener(`click`, onBtnClose);

  for (let i = 0; i < features.length; i++) {
    let feature = features[i];
    let pinClassName = feature.className.replace(`popup__feature popup__feature--`, ``);
    if (pinsClasses.includes(pinClassName) === false) {
      feature.remove();
    }
  }
  avatar.src = pinData.author.avatar;
  cardTemplate.querySelector(`.popup__title`).textContent = pinData.offer.title;
  cardTemplate.querySelector(`.popup__text--address`).textContent = pinData.offer.address;
  cardTemplate.querySelector(`.popup__text--price`).textContent = `${pinData.offer.price} ₽/ночь`;
  cardTemplate.querySelector(`.popup__type`).textContent = getCardType(pinData);
  cardTemplate.querySelector(`.popup__text--capacity`).textContent = `${pinData.offer.rooms} комнаты для ${pinData.offer.guests} гостей`;
  cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${pinData.offer.checkin}, выезд до ${pinData.offer.checkout}`;
  cardTemplate.querySelector(`.popup__description`).textContent = pinData.offer.description;
  const photosWrapper = cardTemplate.querySelector(`.popup__photos`);
  const photo = photosWrapper.querySelector(`.popup__photo`);
  photosWrapper.removeChild(photo);


  for (let i = 0; i < pinData.offer.photos.length; i++) {
    fragment.appendChild(photo.cloneNode(true)).src = pinData.offer.photos[i];
  }
  photosWrapper.appendChild(fragment);

  return cardTemplate;
};

pinsWrapper.addEventListener(`click`, function () {
  const filtersContainer = map.querySelector(`.map__filters-container`);
  map.insertBefore(fillCard(1), filtersContainer);
});
