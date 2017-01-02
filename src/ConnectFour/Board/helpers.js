import { PIECE } from '../constants/index.js';

export const horizontalWinningCondition = (board) => {
  let count = 1;

  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== PIECE.EMPTY) {
        if (board[i][j] === board[i][j-1]) {
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

export const verticalWinningCondition = (board) => {
  let boardCopy = board.slice();
  let transformed = board[0].map(square => []);
  boardCopy.reverse().forEach((row) => {
    row.forEach((square, i) => {
      transformed[i].push(square);
    });
  });
  return horizontalWinningCondition(transformed);
};

export const diagonalWinningCondition = (board) => {
  const reversed = board.map((row) => row.slice().reverse());
  
  return getDiagonal(board) || getDiagonal(reversed);
};

export const hasWinningCondition = (board) => {
  return (horizontalWinningCondition(board) ||
            verticalWinningCondition(board) ||
            diagonalWinningCondition(board));
};

function getDiagonal(board) {
  for (let i = board.length - 1; i >= 3; i--) {
    for (let j = 0; j <= 3; j++) {
      if (board[i][j] !== PIECE.EMPTY) {
        if (hasDiagonal(board, i, j)) {
          return board[i][j];
        }
      }
    }
  }
  return null;
}

function hasDiagonal(board, i, j) {
  return ((board[i][j] === board[i-1][j+1]) &&
         (board[i-1][j+1] === board[i-2][j+2]) &&
         (board[i-2][j+2] === board[i-3][j+3]));
}