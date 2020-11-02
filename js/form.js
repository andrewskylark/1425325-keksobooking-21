'use strict';
(() => {
  const MIN_TITLE_LENGTH = 30;
  const adForm = document.querySelector(`.ad-form`);
  const adInputs = adForm.querySelectorAll(`fieldset`);
  const adFormBtnReset = adForm.querySelector(`button[type="reset"]`);
  // активация/деактивация формы и инпутов
  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
    roomCapacity.querySelector(`[value="1"]`).selected = true;
    roomType.querySelector(`[value="house"]`).selected = true;

    adFormBtnReset.addEventListener(`click`, () => {
      adForm.reset();
      window.previews.clearPreviews();
    });
  };
  const disableForm = () => {
    adForm.classList.add(`ad-form--disabled`);
    adFormBtnReset.removeEventListener(`click`, () => {
      adForm.reset();
    });
  };
  const enableInputs = () => {
    for (let i = 0; i < adInputs.length; i++) {
      adInputs[i].disabled = false;
    }
  };
  const disableInputs = () => {
    for (let i = 0; i < adInputs.length; i++) {
      adInputs[i].disabled = true;
    }
  };
  // запись координат пина в адрес формы
  const fillFormAddress = (elem, pinX, pinY) => {
    const addressInput = document.querySelector(`#address`);
    const {x, y} = window.utils.getCoords(elem);
    addressInput.setAttribute(`value`, window.utils.addressToString(Math.floor(x + pinX / 2), Math.floor(y + pinY)));
  };
  // валидация
  const roomsNumber = adForm.querySelector(`#room_number`);
  const roomCapacity = adForm.querySelector(`#capacity`);
  const price = adForm.querySelector(`#price`);
  const roomType = adForm.querySelector(`#type`);
  const timeOut = adForm.querySelector(`#timeout`);
  const timeIn = adForm.querySelector(`#timein`);
  const adTitle = adForm.querySelector(`#title`);

  adTitle.addEventListener(`input`, () => {
    const adTitleLength = adTitle.value.length;

    if (adTitleLength < MIN_TITLE_LENGTH) {
      adTitle.setCustomValidity(`Минимальная длина - 30 символов. Осталось ${(MIN_TITLE_LENGTH - adTitleLength)}`);
    } else {
      adTitle.setCustomValidity(``);
    }
    adTitle.reportValidity();
  });

  adForm.addEventListener(`change`, () => {
    const guestN = (N) => {
      return roomCapacity.querySelector(`[value="${N}"]`);
    };
    if (roomsNumber.value === `1`) {
      guestN(1).selected = true;
      guestN(0).disabled = true;
      guestN(2).disabled = true;
      guestN(3).disabled = true;
    }
    if (roomsNumber.value === `2`) {
      guestN(2).selected = true;
      guestN(2).disabled = false;
      guestN(3).disabled = true;
      guestN(0).disabled = true;
    } else if (roomsNumber.value === `3`) {
      guestN(3).selected = true;
      guestN(3).disabled = false;
      guestN(2).disabled = false;
      guestN(1).disabled = false;
      guestN(0).disabled = true;
    } else if (roomsNumber.value === `100`) {
      guestN(0).selected = true;
      guestN(0).disabled = false;
      guestN(1).disabled = true;
      guestN(2).disabled = true;
      guestN(3).disabled = true;
    }

    if (roomType.value === `bungalow`) {
      price.placeholder = `0`;
      price.min = `0`;
    } else if (roomType.value === `flat`) {
      price.placeholder = `1000`;
      price.min = `1000`;
    } else if (roomType.value === `house`) {
      price.placeholder = `5000`;
      price.min = `5000`;
    } else if (roomType.value === `palace`) {
      price.placeholder = `10000`;
      price.min = `10000`;
    }

    const timeout = (N) => {
      return timeOut.querySelector(`[value="${N}:00"]`);
    };
    if (timeIn.value === `12:00`) {
      timeout(12).selected = true;
      timeout(12).disabled = false;
      timeout(13).disabled = true;
      timeout(14).disabled = true;
    } else if (timeIn.value === `13:00`) {
      timeout(13).selected = true;
      timeout(13).disabled = false;
      timeout(12).disabled = true;
      timeout(14).disabled = true;
    } else if (timeIn.value === `14:00`) {
      timeout(14).selected = true;
      timeout(14).disabled = false;
      timeout(12).disabled = true;
      timeout(13).disabled = true;
    }
  });

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), window.backend.formErrorHandler, () => {
      window.backend.renderSuccessPopup();
      window.init.deactivateSite();
    });
  };

  adForm.addEventListener(`submit`, formSubmitHandler);

  window.form = {
    enableForm,
    enableInputs,
    disableForm,
    disableInputs,
    fillFormAddress
  };
})();
