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
  window.form = {
    enableForm,
    enableInputs,
    disableInputs
  };
})();
