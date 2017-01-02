'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printCongrats = exports.printError = exports.printInfo = exports.printColorForSquare = exports.printEmpty = exports.printRed = exports.printBlue = exports.endRow = exports.startRow = exports.printBottom = exports.printLabels = exports.printBuffer = exports.print = exports.generateBoard = undefined;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _index = require('./constants/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spaces(num) {
  var output = '';

  for (var i = 0; i < num; i++) {
    output += ' ';
  }

  return output;
}

var generateBoard = exports.generateBoard = function generateBoard() {
  var output = [];

  for (var i = 0; i < 6; i++) {
    output.push([]);
    for (var j = 0; j < 7; j++) {
      output[output.length - 1].push(0);
    }
  }

  return output;
};

var print = exports.print = function print(data) {
  if (typeof data !== 'string') return process.stdout.write(String(data));
  return process.stdout.write(data);
};

var printBuffer = exports.printBuffer = function printBuffer() {
  print('\n\n\n');
};

var printLabels = exports.printLabels = function printLabels() {
  startRow();
  print(_colors2.default.bold(_colors2.default.green('1 2 3 4 5 6 7 ')));
  endRow();
};

var printBottom = exports.printBottom = function printBottom() {
  print(spaces(_index.BOARD.MARGIN));
  print(_colors2.default.bgWhite(spaces(18)));
};

var startRow = exports.startRow = function startRow() {
  print(spaces(_index.BOARD.MARGIN));
  print(_colors2.default.bgWhite(spaces(_index.BOARD.BORDER_SIZE)));
  print(spaces(_index.BOARD.BORDER_PADDING));
};

var endRow = exports.endRow = function endRow() {
  print(spaces(_index.BOARD.BORDER_PADDING));
  print(_colors2.default.bgWhite(spaces(_index.BOARD.BORDER_SIZE)));
  print('\n');
};

var printBlue = exports.printBlue = function printBlue() {
  print(_colors2.default.bgCyan(spaces(_index.BOARD.SPACE_SIZE)));
};

var printRed = exports.printRed = function printRed() {
  print(_colors2.default.bgRed(spaces(_index.BOARD.SPACE_SIZE)));
};

var printEmpty = exports.printEmpty = function printEmpty() {
  print(spaces(_index.BOARD.SPACE_SIZE));
};

var printColorForSquare = exports.printColorForSquare = function printColorForSquare(id) {
  var printer = {
    0: printEmpty,
    1: printRed,
    2: printBlue
  };
  printer[id]();
};

var printInfo = exports.printInfo = function printInfo(data) {
  print('\n');
  print(_colors2.default.bold(_colors2.default.cyan(data)));
  print('\n');
};

var printError = exports.printError = function printError(data) {
  print(_colors2.default.red(data));
};

var printCongrats = exports.printCongrats = function printCongrats(data) {
  print(_colors2.default.rainbow(data));
};