'use strict';
(() => {
  const pinMain = document.querySelector(`.map__pins .map__pin--main`);
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
    window.backend.download(window.map.onLoad, window.backend.onError);
    window.form.fillFormAddress(pinMain, window.consts.PIN_MAIN.x, window.consts.PIN_MAIN.y);
    pinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    pinMain.removeEventListener(`mousedown`, onPinMainMouseButton);
  };
  pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
  pinMain.addEventListener(`keydown`, onPinMainEnterPress);
})();
