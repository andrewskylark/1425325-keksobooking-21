'use strict';
window.pinsData = {
  store: [],
  saveToStore: (pins) => {
    window.pinsData.store = pins;
  },
  getByNum: (num) => {
    return window.pinsData.store[num];
  }
};
