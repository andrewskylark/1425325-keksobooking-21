'use strict';
const pinMain = document.querySelector(`.map__pin--main`);

pinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onDocumentMouseMove = (moveEvt) => {
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
    // для проверяющего: положение метки справа ограничено размером контейнера; метка убегала вправо, тк размер контейнера
    // вычислялся единожды; ниже добавил "живую" переменную, теперь при растягивании/сужении браузера пользлвателем высчитывается "живая" ширина
    const locationXmax = document.querySelector(`.map__pins`).clientWidth;

    if (pinMain.offsetTop - shift.y < (window.consts.PinLocation.y.min - window.consts.PinMain.y)) {
      pinMain.style.top = `${(window.consts.PinLocation.y.min) - window.consts.PinMain.y}px`;
    } else if (pinMain.offsetTop - shift.y > window.consts.PinLocation.y.max - window.consts.PinMain.y) {
      pinMain.style.top = `${(window.consts.PinLocation.y.max - window.consts.PinMain.y)}px`;
    } else if (pinMain.offsetLeft - shift.x < window.consts.PinLocation.x.min - (window.consts.PinMain.x / 2)) {
      pinMain.style.left = `${(window.consts.PinLocation.x.min - (window.consts.PinMain.x / 2))}px`;
    } else if (pinMain.offsetLeft - shift.x > locationXmax - (window.consts.PinMain.x / 2)) {
      pinMain.style.left = `${(locationXmax - (window.consts.PinMain.x / 2))}px`;
    }
  };

  const onDocumentMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onDocumentMouseMove);
    document.removeEventListener(`mouseup`, onDocumentMouseUp);

    if (dragged) {
      const onPinMainClick = (clickEvt) => {
        clickEvt.preventDefault();
        pinMain.removeEventListener(`click`, onPinMainClick);
      };
      pinMain.addEventListener(`click`, onPinMainClick);
    }
    window.form.fillAddress(pinMain, window.consts.PinMain.x, window.consts.PinMain.y);
  };

  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);

});
