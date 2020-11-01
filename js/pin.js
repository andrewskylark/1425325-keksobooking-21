'use strict';
(() => {
  const MAX_PINS_COUNT = 5;
  const PIN = {
    x: 50,
    y: 70
  };
  const fragment = document.createDocumentFragment();
  const pinsWrapper = document.querySelector(`.map__pins`);
  // рендеринг пина из шаблона
  const generatePin = (pinData, j) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
    const avatar = pinTemplate.querySelector(`img`);

    avatar.setAttribute(`data-pin-id`, j);
    avatar.src = pinData.author.avatar;
    avatar.alt = pinData.offer.title;
    pinTemplate.setAttribute(`data-pin-id`, j);
    pinTemplate.style.left = `${pinData.location.x - (PIN.x / 2)}px`;
    pinTemplate.style.top = `${pinData.location.y - PIN.y}px`;

    return pinTemplate;
  };
  const renderPins = (pins) => {
    for (let i = 0; (i < pins.length) && (i < MAX_PINS_COUNT); i++) {
      fragment.append(window.pin.generatePin(pins[i], i));
    }
    pinsWrapper.append(fragment);
  };
  const removePins = () => {
    const pins = pinsWrapper.querySelectorAll(`button[data-pin-id]`);

    for (let pin of pins) {
      pin.remove();
    }
  };

  window.pin = {
    generatePin,
    renderPins,
    removePins,
  };
})();
