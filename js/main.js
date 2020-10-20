'use strict';
const map = document.querySelector(`.map`);
const pinsWrapper = document.querySelector(`.map__pins`);
const pinMain = pinsWrapper.querySelector(`.map__pin--main`);

window.form.disableInputs();
window.filters.disableFilters();
window.form.fillFormAddress(pinMain, window.consts.PIN_MAIN.x, window.consts.PIN_MAIN.x);

pinsWrapper.addEventListener(`click`, (evt) => {
  const popupClose = document.querySelector(`.popup .popup__close`);

  if (popupClose) {
    popupClose.click();
  }
  if ((evt.target.tagName === `IMG` || evt.target.tagName === `BUTTON`) && !evt.target.attributes[`data-pin-main`]) {
    const pinId = evt.target.getAttribute(`data-pin-id`);
    const filtersContainer = map.querySelector(`.map__filters-container`);
    map.insertBefore(window.card.generateCard(pinId), filtersContainer);
  }
});
