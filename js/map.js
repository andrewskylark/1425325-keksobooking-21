'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const fragment = document.createDocumentFragment();
  const pinsWrapper = document.querySelector(`.map__pins`);

  const showMap = function () {
    map.classList.remove(`map--faded`);
  };
  const hideMap = function () {
    map.classList.add(`map--faded`);
  };
  // рендер пинов из загруженных из сервера данных
  const onLoad = (pins) => {
    window.pinsData.saveToStore(pins);
    for (let i = 0; i < pins.length; i++) {
      fragment.append(window.pin.generatePin(pins[i], i));
    }
    pinsWrapper.append(fragment);
  };

  window.map = {
    showMap,
    hideMap,
    onLoad
  };
})();
