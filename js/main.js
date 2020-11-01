'use strict';
// const map = document.querySelector(`.map`);
const pinsWrapper = document.querySelector(`.map__pins`);
const pinMain = pinsWrapper.querySelector(`.map__pin--main`);

window.form.disableInputs();
window.filters.disableFilters();
window.form.fillFormAddress(pinMain, window.consts.PIN_MAIN.x, window.consts.PIN_MAIN.x);
