'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBestMove = exports.score = undefined;

var _index = require('../Board/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../constants/index.js');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEARCH_DEPTH = 4;

var getMoves = function getMoves(board, color) {
  var output = [];
  var b = void 0;
  if (Array.isArray(board)) {
    b = new _index2.default(board);
  } else {
    b = board;
  }

  for (var i = 1; i <= 7; i++) {
    var index = i - 1;
    if (b.isValidMove(index)) {
      b.insertPiece(i, color);
      output.push((0, _lodash.cloneDeep)(b._boardData));
      b.removePiece(i);
    }
  }

  return output;
};

var winningProbability = function winningProbability(board) {
  var turn = _index3.PIECE.BLUE;
  var output = void 0;

  //TODO: Do not calculate invalid board positions or bad branches 
  function breadthFirstSearch(depth, lastPly) {
    if (depth === 0) {
      return lastPly;
    }

    var currentPly = (0, _lodash.flatten)(lastPly.map(function (move) {
      return getMoves(move, turn);
    }));
    turn = turn === _index3.PIECE.BLUE ? _index3.PIECE.RED : _index3.PIECE.BLUE;
    return breadthFirstSearch(--depth, currentPly);
  }

  var scores = breadthFirstSearch(SEARCH_DEPTH, [board]).map(function (board) {
    return score(board);
  });
  var max = scores.filter(function (score) {
    return score > 0;
  }).length / scores.length;
  var min = scores.filter(function (score) {
    return score < 0;
  }).length / scores.length;
  return max - min;
};

var score = exports.score = function score(board) {
  var b = new _index2.default(board);
  var winning = b.winningCondition();

  if (winning) {
    return _index3.PIECE.RED === winning ? Infinity : -Infinity;
  }

  return 0;
};

var calculateBestMove = exports.calculateBestMove = function calculateBestMove(board) {
  var initialMoves = getMoves(board, _index3.PIECE.RED);

  var winningProbabilities = initialMoves.map(function (board) {
    return winningProbability(board);
  });
  console.log(winningProbabilities, '<<<< probs');

  var highestProbability = void 0;
  var last = 0;
  var bestMove = 0;
  winningProbabilities.forEach(function (probability, i) {
    if (probability > last) {
      last = probability;
      bestMove = i;
    }
  });

  return bestMove === 0 ? null : ++bestMove;
};