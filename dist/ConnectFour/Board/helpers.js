'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diagonalWinningCondition = exports.verticalWinningCondition = exports.horizontalWinningCondition = undefined;

var _index = require('../constants/index.js');

var horizontalWinningCondition = exports.horizontalWinningCondition = function horizontalWinningCondition(board) {
  var count = 1;

  for (var i = board.length - 1; i >= 0; i--) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== _index.PIECE.EMPTY) {
        if (board[i][j] === board[i][j - 1]) {
          count++;
        } else {
          count = 1;
        }
      }
      if (count === 4) {
        return board[i][j];
      }
    }
  }
  return null;
};

var verticalWinningCondition = exports.verticalWinningCondition = function verticalWinningCondition(board) {
  var boardCopy = board.slice();
  var transformed = board[0].map(function (square) {
    return [];
  });
  boardCopy.reverse().forEach(function (row) {
    row.forEach(function (square, i) {
      transformed[i].push(square);
    });
  });
  return horizontalWinningCondition(transformed);
};

var diagonalWinningCondition = exports.diagonalWinningCondition = function diagonalWinningCondition(board) {
  var reversed = board.map(function (row) {
    return row.slice().reverse();
  });

  return getDiagonal(board) || getDiagonal(reversed);
};

function getDiagonal(board) {
  for (var i = board.length - 1; i >= 3; i--) {
    for (var j = 0; j <= 3; j++) {
      if (board[i][j] !== _index.PIECE.EMPTY) {
        if (hasDiagonal(board, i, j)) {
          return board[i][j];
        }
      }
    }
  }
  return null;
}

function hasDiagonal(board, i, j) {
  return board[i][j] === board[i - 1][j + 1] && board[i - 1][j + 1] === board[i - 2][j + 2] && board[i - 2][j + 2] === board[i - 3][j + 3];
}