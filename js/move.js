'use strict';
(function () {

  const pinMain = window.consts.pinsWrapper.querySelector(`.map__pin--main`);
  const PIN_MAIN = {
    x: 65,
    y: 87
  };
  const LOCATION = {
    x: {
      min: 0,
      max: window.consts.map.getBoundingClientRect().right
    },
    y: {
      min: 130,
      max: 630
    }
  };
  const addressInput = document.querySelector(`#address`);

  const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
      x: box.left + pageXOffset,
      y: box.top + pageYOffset
    };
  };
  const fillFormAddress = (elem, pinX, pinY) => {
    const {x, y} = getCoords(elem);
    addressInput.value = window.pin.addressToString(Math.floor(x + pinX / 2), Math.floor(y + pinY));
  };
  pinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + `px`;
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + `px`;

      if (pinMain.offsetTop - shift.y < LOCATION.y.min ||
          pinMain.offsetTop - shift.y > LOCATION.y.max ||
          pinMain.offsetLeft - shift.x < LOCATION.x.min ||
          pinMain.offsetLeft - shift.x > LOCATION.x.max - PIN_MAIN.x) {
        document.removeEventListener(`mousemove`, onMouseMove);
      }
      // if (pinMain.offsetTop - shift.y > LOCATION.y.max || pinMain.offsetTop - shift.y < LOCATION.y.min) {
      //   document.removeEventListener(`mousemove`, onMouseMove);
      // }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        pinMain.addEventListener(`click`, onClickPreventDefault);
      }
      fillFormAddress(pinMain, PIN_MAIN.x, PIN_MAIN.y);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });
})();
