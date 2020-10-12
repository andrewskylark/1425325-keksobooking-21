'use strict';
(() => {
  const PIN = {
    x: 50,
    y: 70
  };
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
  window.pin = {
    generatePin
  };
})();
