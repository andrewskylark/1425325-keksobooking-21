'use strict';
(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adInputs = adForm.querySelectorAll(`fieldset`);
  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
  };
  const disableInputs = () => {
    for (let i = 0; i < adInputs.length; i++) {
      adInputs[i].disabled = true;
    }
  };
  const enableInputs = () => {
    for (let i = 0; i < adInputs.length; i++) {
      adInputs[i].disabled = false;
    }
  };
  const fillFormAddress = (elem, pinX, pinY) => {
    const addressInput = document.querySelector(`#address`);
    const {x, y} = window.utils.getCoords(elem);
    addressInput.value = window.utils.addressToString(Math.floor(x + pinX / 2), Math.floor(y + pinY));
  };
  window.form = {
    enableForm,
    enableInputs,
    disableInputs,
    fillFormAddress
  };
})();
