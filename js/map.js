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
  const onLoad = (pins) => {
    window.pinsData.saveToStore(pins);
    updatePins(pins);
  };

  const updatePins = (pins) => {
    window.pin.removePins();
    window.pin.renderPins(pins);

    const renderedPins = pinsWrapper.querySelectorAll(`button[data-pin-id]`);

    for (let renderedPin of renderedPins) {
      const onPinClickHandler = (evt) => {
        window.card.removeCard();
        window.pin.removeActivePin();
        renderedPin.classList.add(`map__pin--active`);

        const pinId = evt.target.getAttribute(`data-pin-id`);
        const filtersContainer = map.querySelector(`.map__filters-container`);

        map.insertBefore(window.card.generateCard(pins[pinId]), filtersContainer);

      };
      renderedPin.addEventListener(`click`, onPinClickHandler);
    }
  };

  window.map = {
    showMap,
    hideMap,
    onLoad,
    updatePins
  };
})();
