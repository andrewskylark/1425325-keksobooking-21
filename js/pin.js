'use strict';
(() => {
  const MAX_PINS_COUNT = 5;
  const Pin = {
    x: 50,
    y: 70
  };
  const fragment = document.createDocumentFragment();
  const pinsWrapper = document.querySelector(`.map__pins`);
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
  // рендеринг пина из шаблона
  const generate = (pinData, j) => {
    const pinTemplate = template.cloneNode(true);
    const avatar = pinTemplate.querySelector(`img`);

    avatar.setAttribute(`data-pin-id`, j);
    avatar.src = pinData.author.avatar;
    avatar.alt = pinData.offer.title;
    pinTemplate.setAttribute(`data-pin-id`, j);
    pinTemplate.style.left = `${pinData.location.x - (Pin.x / 2)}px`;
    pinTemplate.style.top = `${pinData.location.y - Pin.y}px`;

    return pinTemplate;
  };
  const render = (pins) => {
    for (let i = 0; (i < pins.length) && (i < MAX_PINS_COUNT); i++) {
      fragment.append(window.pin.generate(pins[i], i));
    }
    pinsWrapper.append(fragment);
  };
  const remove = () => {
    const pins = pinsWrapper.querySelectorAll(`button[data-pin-id]`);

    for (let pin of pins) {
      pin.remove();
    }
  };
  const removeActive = () => {
    const activePin = document.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  window.pin = {
    generate,
    render,
    remove,
    removeActive
  };
})();
