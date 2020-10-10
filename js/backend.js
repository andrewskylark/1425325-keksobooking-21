'use strict';
(() => {
  const URL_DOWN = `https://21.javascript.pages.academy/keksobooking/data`;

  const download = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL_DOWN);

    xhr.addEventListener(`error`, () => {
      onError(`Oшибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за` + xhr.timeout + `mc`);
    });
    xhr.addEventListener(`load`, () => {
      onLoad(xhr.response);
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

  // let onLoad = (pins) => {
  //   let pinsDataFromServer = pins;
  //   console.log(pinsDataFromServer);
  // };
  // let pinsDataFromServer = () => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = `json`;
  //   xhr.open(`GET`, URL_DOWN);

  //   xhr.addEventListener(`load`, () => {
  //     let Data = xhr.response;
  //     console.log(Data);
  //     Get
  //   });

  //   xhr.send();
  // };
  // pinsDataFromServer();
  // const onLoad = (pins) => {
  //   return pins;
  // };

  window.backend = {
    download,
    onError
  };
})();
