'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const filtersContainer = map.querySelector(`.map__filters-container`);
  const pinsWrapper = document.querySelector(`.map__pins`);

  const show = function () {
    map.classList.remove(`map--faded`);
  };
  const hide = function () {
    map.classList.add(`map--faded`);
  };
  // рендер пинов из загруженных из сервера данных
  const onLoad = (pins) => {
    window.pinsData.saveToStore(pins);
    updatePins(pins);
  };

  const updatePins = (pins) => {
    window.pin.remove();
    window.pin.render(pins);

    const renderedPins = pinsWrapper.querySelectorAll(`button[data-pin-id]`);

    for (let renderedPin of renderedPins) {
      const onPinClick = (evt) => {
        window.card.remove();
        window.pin.removeActive();
        renderedPin.classList.add(`map__pin--active`);

        const pinId = evt.target.getAttribute(`data-pin-id`);

        map.insertBefore(window.card.generate(pins[pinId]), filtersContainer);

      };
      renderedPin.addEventListener(`click`, onPinClick);
    }
  };

  window.map = {
    show,
    hide,
    onLoad,
    updatePins
  };
})();
