'use strict';
(() => {
  const pinMain = document.querySelector(`.map__pins .map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);

  const onPinMainMouseButton = (evt) => {
    if (evt.button === 0) {
      activate();
    }
  };
  const onPinMainEnterPress = (evt) => {
    window.utils.isEnterEvt(evt, activate);
    delete evt.keyCode;
  };
  const activate = () => {
    window.map.show();
    window.filters.enable();
    window.form.enable();
    window.backend.download(window.map.onLoad, window.backend.onError);
    window.form.fillAddress(pinMain, window.consts.PinMain.x, window.consts.PinMain.y);
    pinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    pinMain.removeEventListener(`mousedown`, onPinMainMouseButton);
  };
  const deactivate = () => {
    window.pin.remove();
    window.card.remove();
    window.map.hide();
    window.form.disable();
    window.filters.disable();
    pinMain.style.left = `${window.consts.PinMainDefault.x}px`;
    pinMain.style.top = `${window.consts.PinMainDefault.y}px`;
    window.form.fillAddress(pinMain, window.consts.PinMain.x, window.consts.PinMain.x);
    adForm.reset();
    mapFilters.reset();
    window.previews.clear();
    pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
    pinMain.addEventListener(`keydown`, onPinMainEnterPress);
  };

  pinMain.addEventListener(`mousedown`, onPinMainMouseButton);
  pinMain.addEventListener(`keydown`, onPinMainEnterPress);

  window.init = {
    deactivate
  };
})();
