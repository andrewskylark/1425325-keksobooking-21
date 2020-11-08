'use strict';
const fragment = document.createDocumentFragment();
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`).cloneNode(true);
const avatar = cardTemplate.querySelector(`img`);
const featuresContainer = cardTemplate.querySelector(`.popup__features`);
const feature = featuresContainer.querySelector(`.popup__feature`);
const btnClose = cardTemplate.querySelector(`.popup__close`);
const photosWrapper = cardTemplate.querySelector(`.popup__photos`);
const photo = photosWrapper.querySelector(`.popup__photo`);

photosWrapper.removeChild(photo);
// словарь типа жилья, стр 32
const roomTypeMap = {
  flat: `квартира`,
  house: `дом`,
  bungalow: `бунгало`,
  palace: `дворец`
};

const renderPics = (pinData) => {
  photosWrapper.innerHTML = ``;
  photosWrapper.remove();

  if (pinData.offer.photos.length > 0) {

    cardTemplate.appendChild(photosWrapper);

    pinData.offer.photos.forEach((el) => {
      fragment.appendChild(photo.cloneNode(true)).src = el;
    });
    photosWrapper.appendChild(fragment);
  }
};
const renderFeatures = (pinData) => {
  featuresContainer.remove();
  featuresContainer.innerHTML = ``;

  if (pinData.offer.features.length > 0) {
    cardTemplate.insertBefore(featuresContainer, cardTemplate.querySelector(`.popup__description`));

    pinData.offer.features.forEach((el) => {
      let newFeature = feature.cloneNode(true);
      newFeature.className = newFeature.className.replace(`wifi`, el);
      fragment.appendChild(newFeature);
    });
    featuresContainer.appendChild(fragment);
  }
};
const generate = (pinData) => {

  avatar.src = pinData.author.avatar;
  cardTemplate.querySelector(`.popup__title`).textContent = pinData.offer.title;
  cardTemplate.querySelector(`.popup__text--address`).textContent = pinData.offer.address;
  cardTemplate.querySelector(`.popup__text--price`).textContent = `${pinData.offer.price} ₽/ночь`;
  cardTemplate.querySelector(`.popup__type`).textContent = roomTypeMap[pinData.offer.type];
  cardTemplate.querySelector(`.popup__text--capacity`).textContent = `${pinData.offer.rooms} комнаты для ${pinData.offer.guests} гостей`;
  cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${pinData.offer.checkin}, выезд до ${pinData.offer.checkout}`;
  cardTemplate.querySelector(`.popup__description`).textContent = pinData.offer.description;

  renderPics(pinData);
  renderFeatures(pinData);

  const onBtnCloseClick = () => {
    window.removeCard();
  };
  const onPopupEscPress = (evt) => {
    window.utils.isEscEvt(evt, window.removeCard);
  };

  window.removeCard = () => {
    cardTemplate.remove();
    window.pin.removeActive();
    document.removeEventListener(`keydown`, onPopupEscPress);
    btnClose.removeEventListener(`click`, onBtnCloseClick);
  };

  btnClose.addEventListener(`click`, onBtnCloseClick);
  document.addEventListener(`keydown`, onPopupEscPress);

  return cardTemplate;
};
const remove = () => {
  const cardPopup = document.querySelector(`.map__card.popup`);

  if (cardPopup) {
    window.removeCard();
  }
};

window.card = {
  generate,
  remove
};
