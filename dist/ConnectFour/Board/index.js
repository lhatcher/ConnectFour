'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils.js');

var _helpers = require('./helpers.js');

var _index = require('../constants/index.js');

var _errors = require('../constants/errors.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(data) {
    _classCallCheck(this, Board);

    this._boardData = data || (0, _utils.generateBoard)();
  }

  _createClass(Board, [{
    key: 'printBoard',
    value: function printBoard() {
      var _boardData = this._boardData;


      (0, _utils.printBuffer)();
      (0, _utils.printLabels)();
      _boardData.forEach(function (row) {
        (0, _utils.startRow)();
        row.forEach(function (square) {
          (0, _utils.printColorForSquare)(square);
        });
        (0, _utils.endRow)();
      });
      (0, _utils.printBottom)();
      (0, _utils.printBuffer)();
    }
  }, {
    key: 'insertPiece',
    value: function insertPiece(column, color) {
      var _boardData = this._boardData;


      column -= 1; // subtract so UI numbers match array index
      if (this.isValidMove(column)) {
        for (var i = 0; i < _boardData.length; i++) {
          if (!_boardData[i + 1]) {
            _boardData[i][column] = color;
            return true;
          }

          if (_boardData[i + 1][column] !== _index.PIECE.EMPTY) {
            _boardData[i][column] = color;
            return true;
          }
        }
      } else {
        (0, _utils.printError)(_errors.INVALID_MOVE);
        return false;
      }
    }
  }, {
    key: 'removePiece',
    value: function removePiece(column) {
      var _boardData = this._boardData;

      column -= 1;

      for (var i = 0; i < _boardData.length; i++) {
        if (_boardData[i][column] !== _index.PIECE.EMPTY) {
          _boardData[i][column] = _index.PIECE.EMPTY;
          return;
        }
      }
    }
  }, {
    key: 'isValidMove',
    value: function isValidMove(column) {
      var int = parseInt(column);
      return this._boardData[0][column] === _index.PIECE.EMPTY;
    }
  }, {
    key: 'winningCondition',
    value: function winningCondition() {
      var _boardData = this._boardData;


      return (0, _helpers.horizontalWinningCondition)(_boardData) || (0, _helpers.verticalWinningCondition)(_boardData) || (0, _helpers.diagonalWinningCondition)(_boardData);
    }
  }]);

  return Board;
}();

exports.default = Board;