const path = require("path");

module.exports = {
  entry: [
    "./js/consts.js",
    "./js/utils.js",
    "./js/init.js",
    "./js/backend.js",
    "./js/pinsData.js",
    "./js/move.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/previews.js",
    "./js/form.js",
    "./js/card.js",
    "./js/debounce.js",
    "./js/filters.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
