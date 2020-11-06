'use strict';
(() => {
  const mapPins = document.querySelector(`.map__pins`);
  const Location = {
    x: {
      min: mapPins.getBoundingClientRect().left,
      max: mapPins.getBoundingClientRect().right
    },
    y: {
      min: 130,
      max: 630
    }
  };
  const PinMain = {
    x: 65,
    y: 87
  };
  const PinMainDefault = {
    x: 570,
    y: 375
  };
  window.consts = {
    Location,
    PinMain,
    PinMainDefault
  };
})();
