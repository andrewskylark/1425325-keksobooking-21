'use strict';
(() => {
  const fragment = document.createDocumentFragment();
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
  const fillCard = (num) => {
    const pinData = window.pinsData.getByNum(num);
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

  window.card = {
    fillCard
  };
})();
