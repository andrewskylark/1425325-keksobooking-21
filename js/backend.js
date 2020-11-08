'use strict';
const URL_DOWN = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UP = `https://21.javascript.pages.academy/keksobooking`;
const StatusCode = {
  OK: 200
};
const successPopup = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
const closeBtn = errorPopup.querySelector(`.error__button`);

const createNewXhr = (method, url, onLoad, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(method, url);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
      window.filters.enable();
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
  xhr.send(data);
};
const renderPopup = (popup, popupClass) => {
  document.querySelector(`main`).insertAdjacentElement(`afterbegin`, popup);

  const onPopupClose = () => {
    document.querySelector(popupClass).remove();
    window.removeEventListener(`click`, onPopupClose);
    document.removeEventListener(`keydown`, onPopupEscPress);

    if (closeBtn) {
      closeBtn.removeEventListener(`click`, onPopupClose);
    }
  };
  const onPopupEscPress = (evt) => {
    window.utils.isEscEvt(evt, onPopupClose);
  };

  document.addEventListener(`keydown`, onPopupEscPress);
  window.addEventListener(`click`, onPopupClose);
  if (closeBtn) {
    closeBtn.addEventListener(`click`, onPopupClose);
  }
};

const download = (onDownload, onDownloadError) => {
  // const xhr = new XMLHttpRequest();
  // xhr.responseType = `json`;
  // xhr.open(`GET`, URL_DOWN);

  // xhr.addEventListener(`load`, () => {
  //   if (xhr.status === StatusCode.OK) {
  //     onDownload(xhr.response);
  //     window.filters.enable();
  //   } else {
  //     onDownloadError(`Ошибка загрузки данных`);
  //   }
  // });
  // xhr.addEventListener(`error`, () => {
  //   onDownloadError(`Oшибка соединения`);
  // });
  // xhr.addEventListener(`timeout`, () => {
  //   onDownloadError(`Запрос не успел выполниться за` + xhr.timeout + `mc`);
  // });
  createNewXhr(`GET`, URL_DOWN, onDownload, onDownloadError);
  // xhr.send();
};
const upload = (data, onUploadError, onUploadSuccess) => {
  // const xhr = new XMLHttpRequest();
  // xhr.responseType = `json`;
  // xhr.open(`POST`, URL_UP);

  // xhr.addEventListener(`load`, () => {
  //   if (xhr.status === StatusCode.OK) {
  //     onUploadSuccess(xhr.response);
  //   } else {
  //     onUploadError();
  //   }
  // });
  // xhr.addEventListener(`error`, ()=> {
  //   onUploadError();
  // });

  // xhr.send(data);
  createNewXhr(`POST`, URL_UP, onUploadSuccess, onUploadError, data);
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
const onFormSuccess = () => {
  renderPopup(successPopup, `.success`);
};
const onFormError = () => {
  renderPopup(errorPopup, `.error`);
};

window.backend = {
  download,
  upload,
  onDownloadError,
  onFormSuccess,
  onFormError
};
