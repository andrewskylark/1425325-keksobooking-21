'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const fragment = document.createDocumentFragment();
  const pinsWrapper = document.querySelector(`.map__pins`);
  const PINS_COUNT = 8;

  const showMap = function () {
    map.classList.remove(`map--faded`);
  };
  // рендер пинов из предоставленных данных
  const renderPins = function () {
    for (let i = 0; i < PINS_COUNT; i++) {
      fragment.append(window.pin.getPin(i));
    }
    pinsWrapper.append(fragment);
  };
  // рендер пинов из загруженных из сервера данных

  const onLoad = (pins) => {
    window.pinData.saveToStore(pins);
    for (let i = 0; i < pins.length; i++) {
      fragment.append(window.pin.generatePin(pins[i], i));
    }
    pinsWrapper.append(fragment);
  };
  window.map = {
    showMap,
    renderPins,
    onLoad
  };
})();
(() => {
  window.pinData = {
    store: [],
    saveToStore: (pins) => {
      window.pinData.store = pins;
    },
    getByNum: (num) => {
      return window.pinData.store[num];
    }
  };
})();
