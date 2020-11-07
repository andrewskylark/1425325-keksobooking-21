'use strict';
(() => {
  const ESC_KEY = `Escape`;
  const ENTER_KEY = `Enter`;

  window.utils = {
    getRandom: (min, max) => {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomFromArray: (array) => {
      return array[window.utils.getRandom(0, array.length - 1)];
    },
    shuffleArray: (array) => {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    },
    isEscEvt: (evt, action) => {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterEvt: (evt, action) => {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    addressToString: (x, y) => {
      return `${x}, ${y}`;
    },
    getCoords: (elem) => {
      const box = elem.getBoundingClientRect();

      return {
        x: box.left + pageXOffset,
        y: box.top + pageYOffset
      };
    }
  };
})();
