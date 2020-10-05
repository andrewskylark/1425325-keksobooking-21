'use strict';
const PIN_MAIN = {
  x: 65,
  y: 87
};
const pinMain = window.consts.pinsWrapper.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    x: box.left + pageXOffset,
    y: box.top + pageYOffset
  };
};
const fillFormAddress = (elem, pinX, pinY) => {
  const {x, y} = getCoords(elem);
  addressInput.value = window.pin.addressToString(Math.floor(x + pinX / 2), Math.floor(y + pinY));
};

window.form.disableInputs();
window.filters.disableFilters();
fillFormAddress(pinMain, PIN_MAIN.x, PIN_MAIN.x);
window.consts.pinsWrapper.addEventListener(`click`, function () {
  const filtersContainer = window.consts.map.querySelector(`.map__filters-container`);
  window.consts.map.insertBefore(window.card.fillCard(1), filtersContainer);
});

const onPinMainMouseButton = (evt) => {
  if (typeof evt === `object` && evt.button === 0) {
    activateSite();
  }
};
const onPinMainEnterPress = (evt) => {
  window.utils.isEnterEvt(evt, activateSite);
  delete evt.keyCode;
};

const activateSite = () => {
  window.map.showMap();
  window.form.enableInputs();
  window.form.enableForm();
  window.filters.enableFilters();
  window.map.renderPins();
  fillFormAddress(pinMain, PIN_MAIN.x, PIN_MAIN.y);
  pinMain.removeEventListener(`keydown`, onPinMainEnterPress);
  pinMain.removeEventListener(`mousedown`, onPinMainMouseButton);
};
pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
pinMain.addEventListener(`keydown`, onPinMainEnterPress);
