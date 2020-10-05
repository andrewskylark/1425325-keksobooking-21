'use strict';
(() => {
  const PINS_COUNT = 8;

  const showMap = function () {
    window.consts.map.classList.remove(`map--faded`);
  };
  const renderPins = function () {
    for (let i = 0; i < PINS_COUNT; i++) {
      window.consts.fragment.append(window.pin.getPin(i));
    }
    window.consts.pinsWrapper.append(window.consts.fragment);
  };
  window.map = {
    showMap,
    renderPins
  };
})();
