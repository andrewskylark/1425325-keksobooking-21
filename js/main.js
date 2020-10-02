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
const PIN_MAIN = {
  x: 65,
  y: 87
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

// pinsWrapper.addEventListener(`click`, function () {
//   const filtersContainer = map.querySelector(`.map__filters-container`);
//   map.insertBefore(fillCard(1), filtersContainer);
// });

// const notice = document.querySelector(`.notice`);
const mapFilters = map.querySelector(`.map__filters`);
const selectRooms = mapFilters.querySelector(`#housing-rooms`);
const selectGuests = mapFilters.querySelector(`#housing-guests`);
const adForm = document.querySelector(`.ad-form`);
const addressInput = adForm.querySelector(`#address`);
const adInputs = adForm.querySelectorAll(`fieldset`);
const mainPin = pinsWrapper.querySelector(`.map__pin--main`);

const enableForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
};
const disableFilters = () => {
  mapFilters.classList.add(`map__filters--disabled`);
};
const enableFilters = () => {
  mapFilters.classList.remove(`map__filters--disabled`);
};
const disableInputs = () => {
  for (let i = 0; i < adInputs.length; i++) {
    adInputs[i].disabled = true;
  }
};
const enableInputs = () => {
  for (let i = 0; i < adInputs.length; i++) {
    adInputs[i].disabled = false;
  }
};
const fillFormAddress = (elem, pinX, pinY) => {
  addressInput.value = getAddress(Math.floor(getCoords(elem).x + pinX / 2), (Math.floor(getCoords(elem).y + pinY)));
};
const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    x: box.left + pageXOffset,
    y: box.top + pageYOffset
  };
};
// по умолчанию страница задизэйблена, и адрес главного пина прописан
disableInputs();
disableFilters();
fillFormAddress(mainPin, PIN_MAIN.x, PIN_MAIN.x);

const onMainPinMouseButton = (evt) => {
  if (typeof evt === `object`) {
    switch (evt.mainPin) {
      case 0:
        console.log(`у меня тачпад, левый клик не срабатывает`);
        break;
      default:
        activateSite();
    }
  }
};
const onMainPinEnterPress = (evt) => {
  if (evt.keyCode === 13) {
    activateSite();
    delete evt.keyCode;
  }
};
// действия при активации страницы при нажатии на главный пин
const activateSite = () => {
  showMap();
  enableInputs();
  enableForm();
  enableFilters();
  renderPins();
  fillFormAddress(mainPin, PIN_MAIN.x, PIN_MAIN.y);
  mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseButton);
};
mainPin.addEventListener(`mousedown`, onMainPinMouseButton);
mainPin.addEventListener(`keydown`, onMainPinEnterPress);
// связал селекты гостпй и комнат,пока без 3 гостей и 100 комнат
mapFilters.addEventListener(`change`, () => {
  if (selectRooms.value === `1`) {
    selectGuests.value = `1`;
  } else if (selectRooms.value === `2`) {
    selectGuests.querySelector(`[value="2"]`).selected = true;
    selectGuests.querySelector(`[value="0"]`).disabled = true;
    selectGuests.querySelector(`[value="any"]`).disabled = true;
  } else if (selectRooms.value === `3`) {
    selectGuests.querySelector(`[value="3"]`).selected = true;
    selectGuests.querySelector(`[value="0"]`).disabled = true;
    selectGuests.querySelector(`[value="any"]`).disabled = true;
  }
});
