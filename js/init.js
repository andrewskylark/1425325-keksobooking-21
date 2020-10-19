'use strict';
(() => {
  const pinMain = document.querySelector(`.map__pins .map__pin--main`);
  const pinsWrapper = document.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);

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
  const deactivateSite = () => {
    const pins = pinsWrapper.querySelectorAll(`button[data-pin-id]`);

    for (let pin of pins) {
      pin.remove();
    }
    window.map.hideMap();
    window.form.disableInputs();
    window.form.disableForm();
    window.filters.disableFilters();
    window.form.fillFormAddress(pinMain, window.consts.PIN_MAIN.x, window.consts.PIN_MAIN.y);
    adForm.reset();
    pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
    pinMain.addEventListener(`keydown`, onPinMainEnterPress);
  };

  pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
  pinMain.addEventListener(`keydown`, onPinMainEnterPress);

  window.init = {
    deactivateSite
  };
})();
