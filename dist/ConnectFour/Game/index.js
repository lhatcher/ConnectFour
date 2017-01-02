'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../Board/index.js');

var _index2 = _interopRequireDefault(_index);

var _evaluation = require('./evaluation.js');

var _errors = require('../constants/errors.js');

var _index3 = require('../constants/index.js');

var _messages = require('../constants/messages.js');

var _utils = require('../utils.js');

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this._board = new _index2.default();
    this._turn = _index3.PIECE.BLUE;
    this._difficultySetting;
    (0, _utils.printInfo)('GAME INITIALIZED');
    this.showMenu();
  }

  _createClass(Game, [{
    key: 'loop',
    value: function loop() {
      var _this = this;

      var _board = this._board,
          _turn = this._turn;


      var winning = _board.winningCondition();

      if (winning) {
        if (winning === _index3.PIECE.BLUE) {
          this.displayWinningMessage(_index3.PIECE.BLUE);
        } else {
          this.displayWinningMessage(_index3.PIECE.RED);
        }
        return;
      }

      if (_turn === _index3.PIECE.BLUE) {
        _prompt2.default.get(['move'], function (err, input) {
          var success = _board.insertPiece(input.move, _index3.PIECE.BLUE);
          if (success) {
            _this._turn = _index3.PIECE.RED;
          }
          _board.printBoard();
          _this.loop();
        });
      } else {
        this.executeComputerTurn();
        _board.printBoard();
        this.loop();
      }
    }
  }, {
    key: 'startTurn',
    value: function startTurn() {
      this._turn = this._turn === _index3.PIECE.RED ? _index3.PIECE.BLUE : _index3.PIECE.RED;
    }
  }, {
    key: 'displayWinningMessage',
    value: function displayWinningMessage(winner) {
      var _this2 = this;

      (0, _utils.printCongrats)(_messages.WINNING[winner]);
      _prompt2.default.get(['play_again?'], function (err, input) {
        _this2._board = new _index2.default();
        _this2.loop();
      });
    }
  }, {
    key: 'executeComputerTurn',
    value: function executeComputerTurn() {
      var rand = Math.round(Math.random() * 7);
      var bestMove = (0, _evaluation.calculateBestMove)(this._board);
      var move = bestMove || rand;
      var success = this._board.insertPiece(move, _index3.PIECE.RED);
      if (success) {
        this._turn = _index3.PIECE.BLUE;
      }
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      var _this3 = this;

      (0, _utils.printInfo)(_messages.WELCOME);
      (0, _utils.printInfo)(_messages.MENU);
      _prompt2.default.get(['option'], function (err, input) {
        if (input.option <= _messages.MENU.length) {
          _this3._difficultySetting = input.option;
        }
        _this3._board.printBoard();
        _this3.loop();
      });
    }
  }]);

  return Game;
}();

exports.default = Game;