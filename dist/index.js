'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _main = require('./ConnectFour/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.listen(3000, function () {
  // console.log('Game server running at http://127.0.0.1:3000/');
});

// prompt.get(['name'], (err, results) => {
//   console.log(colors.cyan(results.name));
// });