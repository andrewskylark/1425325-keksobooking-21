'use strict';
(function () {
  const pinMain = document.querySelector(`.map__pin--main`);

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

      pinMain.style.top = `${(pinMain.offsetTop - shift.y)}px`;
      pinMain.style.left = `${(pinMain.offsetLeft - shift.x)}px`;

      if (pinMain.offsetTop - shift.y < window.consts.LOCATION.y.min) {
        pinMain.style.top = `${(window.consts.LOCATION.y.min)}px`;
      } else if (pinMain.offsetTop - shift.y > window.consts.LOCATION.y.max) {
        pinMain.style.top = `${(window.consts.LOCATION.y.max)}px`;
      } else if (pinMain.offsetLeft - shift.x < window.consts.LOCATION.x.min) {
        pinMain.style.left = `${(window.consts.LOCATION.x.min)}px`;
      } else if (pinMain.offsetLeft - shift.x > window.consts.LOCATION.x.max - window.consts.PIN_MAIN.x) {
        pinMain.style.left = `${(window.consts.LOCATION.x.max - window.consts.PIN_MAIN.x)}px`;
      }
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
      window.form.fillFormAddress(pinMain, window.consts.PIN_MAIN.x, window.consts.PIN_MAIN.y);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });
})();
