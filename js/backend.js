'use strict';
(() => {
  const URL_DOWN = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UP = `https://21.javascript.pages.academy/keksobooking`;
  const STATUS = {
    OK: 200
  };

  const download = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL_DOWN);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS.OK) {
        onLoad(xhr.response);
        window.filters.enableFilters();
      } else {
        onError(`Ошибка загрузки данных`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Oшибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за` + xhr.timeout + `mc`);
    });

    xhr.send();
  };

  const onError = (errorMsg) => {
    const divError = document.body.querySelector(`div.divError`);
    if (divError) {
      divError.remove();
    }

    const node = document.createElement(`div`);
    node.className = `div-error`;
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = `10%`;
    node.style.right = `20%`;
    node.style.fontSize = `20px`;
    node.style.opacity = `0.5`;

    node.textContent = errorMsg;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const upload = (data, onUpError, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, URL_UP);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS.OK) {
        onSuccess(xhr.response);
      } else {
        onUpError();
      }
    });
    xhr.addEventListener(`error`, ()=> {
      onUpError();
    });

    xhr.send(data);
  };

  const renderSuccessPopup = () => {
    const successPopup = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
    document.body.insertAdjacentElement(`afterbegin`, successPopup);

    const closeSuccess = () => {
      document.querySelector(`.success`).remove();
      window.removeEventListener(`click`, closeSuccess);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };
    const onPopupEscPress = (evt) => {
      window.utils.isEscEvt(evt, closeSuccess());
    };

    document.addEventListener(`keydown`, onPopupEscPress);
    window.addEventListener(`click`, closeSuccess);
  };

  const formErrorHandler = () => {
    const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
    const closeBtn = errorPopup.querySelector(`.error__button`);

    document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorPopup);

    const closeError = () => {
      document.querySelector(`.error`).remove();
      window.removeEventListener(`click`, closeError);
      document.removeEventListener(`keydown`, onPopupEscPress);
      closeBtn.removeEventListener(`click`, closeError);
    };
    const onPopupEscPress = (evt) => {
      window.utils.isEscEvt(evt, closeError);
    };
    closeBtn.addEventListener(`click`, closeError);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.addEventListener(`click`, closeError);
  };

  window.backend = {
    download,
    upload,
    onError,
    renderSuccessPopup,
    formErrorHandler
  };
})();
