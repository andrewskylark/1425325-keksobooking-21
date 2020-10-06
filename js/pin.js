'use strict';
(() => {
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const ROOMS = [1, 2, 3, 100];
  const GUESTS = [1, 2, 3];
  const CHECKINS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PRICE = {
    min: 50,
    max: 150
  };
  const PIN = {
    x: 50,
    y: 70
  };
  const getAvatarUrl = (number) => {
    return `img/avatars/user0${number + 1}.png`;
  };
  const getPinData = (number) => {
    const x = window.utils.getRandom(window.consts.LOCATION.x.min, window.consts.LOCATION.x.max);
    const y = window.utils.getRandom(window.consts.LOCATION.y.min, window.consts.LOCATION.y.max);
    const features = window.utils.shuffleArray(FEATURES).slice(0, window.utils.getRandom(1, FEATURES.length));
    const photos = window.utils.shuffleArray(PHOTOS).slice(0, window.utils.getRandom(1, PHOTOS.length));

    return {
      author: {
        avatar: getAvatarUrl(number)
      },
      offer: {
        title: ``,
        address: window.utils.addressToString(x, y),
        price: window.utils.getRandom(PRICE.min, PRICE.max),
        type: window.utils.getRandomFromArray(TYPES),
        rooms: window.utils.getRandomFromArray(ROOMS),
        guests: window.utils.getRandomFromArray(GUESTS),
        checkin: window.utils.getRandomFromArray(CHECKINS),
        checkout: window.utils.getRandomFromArray(CHECKOUTS),
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
  const getPin = (number) => {
    const pinData = getPinData(number);
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
    const avatar = pinTemplate.querySelector(`img`);

    avatar.src = pinData.author.avatar;
    avatar.alt = `заголовок объявления`;
    pinTemplate.style.left = `${pinData.location.x - (PIN.x / 2)}px`;
    pinTemplate.style.top = `${pinData.location.y - PIN.y}px`;

    return pinTemplate;
  };

  window.pin = {
    getPinData,
    getPin
  };
})();
