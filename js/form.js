'use strict';
(() => {
  const MIN_TITLE_LENGTH = 30;
  const adForm = document.querySelector(`.ad-form`);
  const adFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormBtnReset = adForm.querySelector(`button[type="reset"]`);
  const inputs = adForm.querySelectorAll(`input`);
  const addressInput = document.querySelector(`#address`);

  const PriceThresholds = {
    NONE: 0,
    LOW: 1000,
    MIDDLE: 5000,
    HIGH: 10000
  };
  // активация/деактивация формы и инпутов
  const enable = () => {
    adForm.classList.remove(`ad-form--disabled`);

    for (let option of roomCapacity.options) {
      option.disabled = true;
    }

    roomCapacity.querySelector(`[value="1"]`).selected = true;
    roomCapacity.querySelector(`[value="1"]`).disabled = false;
    roomType.querySelector(`[value="house"]`).selected = true;

    adFieldsets.forEach((el) => {
      el.disabled = false;
    });

    adFormBtnReset.addEventListener(`click`, () => {
      window.init.deactivate();

      inputs.forEach((el) => {
        el.style.outline = `none`;
      });
    });
  };
  const disable = () => {
    adForm.classList.add(`ad-form--disabled`);

    adFieldsets.forEach((el) => {
      el.disabled = true;
    });
    adFormBtnReset.removeEventListener(`click`, () => {
      window.init.deactivate();
    });
  };
  // запись координат пина в адрес формы
  const fillAddress = (elem, pinX, pinY) => {
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

  const syncCheckinTimes = () => {
    timeOut.value = timeIn.value;
  };
  const roomsSincGuest = (rooms, guests) => {
    const optionsMapping = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
    return () => {
      const value = +rooms.value;
      const options = guests.options;
      const availableOptions = optionsMapping[value];

      for (let i = 0; i < options.length; i++) {
        if (availableOptions.indexOf(+options[i].value) !== -1) {
          options[i].disabled = false;
          if (+options[i].value === value || availableOptions.length === 1) {
            options[i].selected = true;
          }
        } else {
          options[i].disabled = true;
        }
      }
    };
  };

  roomsNumber.addEventListener(`change`, roomsSincGuest(roomsNumber, roomCapacity));
  adTitle.addEventListener(`input`, () => {
    const adTitleLength = adTitle.value.length;

    if (adTitleLength < MIN_TITLE_LENGTH) {
      adTitle.setCustomValidity(`Минимальная длина - 30 символов. Осталось ${(MIN_TITLE_LENGTH - adTitleLength)}`);
    } else {
      adTitle.setCustomValidity(``);
      adTitle.style.outline = `none`;
    }
    adTitle.reportValidity();
  });
  price.addEventListener(`input`, () => {
    if (parseInt(price.value, 10) < parseInt(price.min, 10)) {
      price.setCustomValidity(`Минимальная цена: ${price.min}Р.`);
    } else {
      price.setCustomValidity(``);
      price.style.outline = `none`;
    }
    price.reportValidity();
  });
  adForm.addEventListener(`change`, () => {

    if (roomType.value === `bungalow`) {
      price.placeholder = PriceThresholds.NONE;
      price.min = PriceThresholds.NONE;
    } else if (roomType.value === `flat`) {
      price.placeholder = PriceThresholds.LOW;
      price.min = PriceThresholds.LOW;
    } else if (roomType.value === `house`) {
      price.placeholder = PriceThresholds.MIDDLE;
      price.min = PriceThresholds.MIDDLE;
    } else if (roomType.value === `palace`) {
      price.placeholder = PriceThresholds.HIGH;
      price.min = PriceThresholds.HIGH;
    }

    syncCheckinTimes();
  });

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), window.backend.onFormError, () => {
      window.backend.renderSuccessPopup();
      window.init.deactivate();
    });
  };

  adForm.addEventListener(`submit`, onFormSubmit);

  const formSubmitBtn = adForm.querySelector(`button[type="submit"]`);

  formSubmitBtn.addEventListener(`click`, () => {

    for (let input of inputs) {
      if (input.checkValidity() === false) {
        input.style.outline = `red solid 2px`;
      } else {
        input.style.outline = `none`;
      }
    }
  });

  window.form = {
    enable,
    disable,
    fillAddress
  };
})();
