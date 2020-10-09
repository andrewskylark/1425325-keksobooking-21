'use strict';
(() => {
  const URL_DOWN = `https://21.javascript.pages.academy/keksobooking/data`;

  const download = (onLoad) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL_DOWN);

    xhr.addEventListener(`load`, () => {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    download
  };
})();
