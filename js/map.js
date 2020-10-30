'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const pinsWrapper = document.querySelector(`.map__pins`);

  const showMap = function () {
    map.classList.remove(`map--faded`);
  };
  const hideMap = function () {
    map.classList.add(`map--faded`);
  };
  // рендер пинов из загруженных из сервера данных
  // let pinsData = [];
  const onLoad = (pins) => {
    window.pinsData.saveToStore(pins);
    // pinsData = pins;
    updatePins(pins);
  };

  const updatePins = (pins) => {
    window.pin.renderPins(pins);

    pinsWrapper.addEventListener(`click`, (evt) => {
      window.card.removeCard();

      if ((evt.target.tagName === `IMG` || evt.target.tagName === `BUTTON`) && !evt.target.attributes[`data-pin-main`]) {
        const pinId = evt.target.getAttribute(`data-pin-id`);
        const filtersContainer = map.querySelector(`.map__filters-container`);
        map.insertBefore(window.card.generateCard(pins[pinId]), filtersContainer);
      }
    });
  };

  window.map = {
    showMap,
    hideMap,
    onLoad,
    updatePins
  };
})();
