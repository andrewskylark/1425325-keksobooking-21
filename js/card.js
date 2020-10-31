'use strict';
(() => {
  const fragment = document.createDocumentFragment();
  // словарь типа жилья, стр 32
  const roomTypeMap = {
    flat: `квартира`,
    house: `дом`,
    bungalow: `бунгало`,
    palace: `дворец`
  };

  const generateCard = (pinData) => {
    // const pinData = window.pinsData.getByNum(num);
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`).cloneNode(true);
    const avatar = cardTemplate.querySelector(`img`);
    const featuresContainer = cardTemplate.querySelector(`.popup__features`);
    const features = featuresContainer.querySelectorAll(`.popup__feature`);
    const pinsClasses = pinData.offer.features;
    const btnClose = cardTemplate.querySelector(`.popup__close`);

    avatar.src = pinData.author.avatar;
    cardTemplate.querySelector(`.popup__title`).textContent = pinData.offer.title;
    cardTemplate.querySelector(`.popup__text--address`).textContent = pinData.offer.address;
    cardTemplate.querySelector(`.popup__text--price`).textContent = `${pinData.offer.price} ₽/ночь`;
    cardTemplate.querySelector(`.popup__type`).textContent = roomTypeMap[pinData.offer.type];
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

    for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      let pinClassName = feature.className.replace(`popup__feature popup__feature--`, ``);
      if (pinsClasses.includes(pinClassName) === false) {
        feature.remove();
      }
    }
    const onBtnClose = () => {
      window.removeCard();
    };
    const onPopupEscPress = (evt) => {
      window.utils.isEscEvt(evt, window.removeCard);
    };
    window.removeCard = () => {
      cardTemplate.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
      btnClose.removeEventListener(`click`, onBtnClose);
    };

    btnClose.addEventListener(`click`, onBtnClose);
    document.addEventListener(`keydown`, onPopupEscPress);

    return cardTemplate;
  };
  const removeCard = () => {
    const cardPopup = document.querySelector(`.map__card.popup`);

    if (cardPopup) {
      // cardPopup.remove();
      window.removeCard();
    }
  };

  window.card = {
    generateCard,
    removeCard
  };
})();
