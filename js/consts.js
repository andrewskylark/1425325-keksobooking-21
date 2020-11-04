'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const LOCATION = {
    x: {
      min: 0,
      max: map.getBoundingClientRect().right
    },
    y: {
      min: 130,
      max: 630
    }
  };
  const PIN_MAIN = {
    x: 65,
    y: 87
  };
  const PIN_MAIN_DEFAULT = {
    x: 570,
    y: 375
  };
  window.consts = {
    LOCATION,
    PIN_MAIN,
    PIN_MAIN_DEFAULT
  };
})();
