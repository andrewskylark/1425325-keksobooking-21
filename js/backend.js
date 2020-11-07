'use strict';
(() => {
  const URL_DOWN = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UP = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };
  const successPopup = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const closeBtn = errorPopup.querySelector(`.error__button`);

  const download = (onLoad, onDownloadError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL_DOWN);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        window.filters.enable();
      } else {
        onDownloadError(`Ошибка загрузки данных`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onDownloadError(`Oшибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onDownloadError(`Запрос не успел выполниться за` + xhr.timeout + `mc`);
    });

    xhr.send();
  };

  const upload = (data, onUploadError, onUploadSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, URL_UP);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onUploadSuccess(xhr.response);
      } else {
        onUploadError();
      }
    });
    xhr.addEventListener(`error`, ()=> {
      onUploadError();
    });

    xhr.send(data);
  };

  const onDownloadError = (errorMsg) => {
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

  const renderSuccessPopup = () => {
    document.body.insertAdjacentElement(`afterbegin`, successPopup);

    const onSuccessPopupClose = () => {
      document.querySelector(`.success`).remove();
      window.removeEventListener(`click`, onSuccessPopupClose);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };
    const onPopupEscPress = (evt) => {
      window.utils.isEscEvt(evt, onSuccessPopupClose);
    };

    document.addEventListener(`keydown`, onPopupEscPress);
    window.addEventListener(`click`, onSuccessPopupClose);
  };

  const onFormError = () => {

    document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorPopup);

    const onErrorPopupClose = () => {
      document.querySelector(`.error`).remove();
      window.removeEventListener(`click`, onErrorPopupClose);
      document.removeEventListener(`keydown`, onPopupEscPress);
      closeBtn.removeEventListener(`click`, onErrorPopupClose);
    };
    const onPopupEscPress = (evt) => {
      window.utils.isEscEvt(evt, onErrorPopupClose);
    };
    closeBtn.addEventListener(`click`, onErrorPopupClose);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.addEventListener(`click`, onErrorPopupClose);
  };

  window.backend = {
    download,
    upload,
    onDownloadError,
    renderSuccessPopup,
    onFormError
  };
})();
