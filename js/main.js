'use strict';
const pinsWrapper = document.querySelector(`.map__pins`);
const pinMain = pinsWrapper.querySelector(`.map__pin--main`);

window.init.deactivate();
window.form.fillAddress(pinMain, window.consts.PinMain.x, window.consts.PinMain.x);
