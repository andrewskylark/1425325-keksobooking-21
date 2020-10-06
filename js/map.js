'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const fragment = document.createDocumentFragment();
  const pinsWrapper = document.querySelector(`.map__pins`);
  const PINS_COUNT = 8;

  const showMap = function () {
    map.classList.remove(`map--faded`);
  };
  const renderPins = function () {
    for (let i = 0; i < PINS_COUNT; i++) {
      fragment.append(window.pin.getPin(i));
    }
    pinsWrapper.append(fragment);
  };
  window.map = {
    showMap,
    renderPins
  };
})();
