import { 
  generateBoard,
  printBuffer,
  startRow,
  endRow,
  printColorForSquare,
  printError,
  printLabels,
  printBottom
} from '../utils.js';
import { hasWinningCondition } from './helpers.js';
import { PIECE } from '../constants/index.js';
import { INVALID_MOVE } from '../constants/errors.js';

class Board {

  constructor(data) {
    this._boardData = data || generateBoard();
  }

  printBoard() {
    const { _boardData } = this;

    printBuffer();
    printLabels();
    _boardData.forEach((row) => {
      startRow();
      row.forEach((square) => {
        printColorForSquare(square);
      });
      endRow();
    });
    printBottom();
    printBuffer();
  }

  insertPiece(column, color) {
    const { _boardData } = this;

    column -= 1; // subtract so UI numbers match array index
    if (this.isValidMove(column)) {
      for (let i = 0; i < _boardData.length; i++) {
        if (!_boardData[i+1]) {
          _boardData[i][column] = color;
          return true;
        }

        if (_boardData[i+1][column] !== PIECE.EMPTY) {
          _boardData[i][column] = color;
          return true;
        }
      }
    } else {
      printError(++column);
      printError(INVALID_MOVE);
      return false;   
    }
  }

  removePiece(column) {
    const { _boardData } = this;
    column -= 1;

    for (let i = 0; i < _boardData.length; i++) {
      if (_boardData[i][column] !== PIECE.EMPTY) {
        _boardData[i][column] = PIECE.EMPTY;
        return;
      }
    }
  }

  isValidMove(column) {
    const int = parseInt(column);
    return this._boardData[0][column] === PIECE.EMPTY;
  }

  winningCondition() {
    const { _boardData } = this;

    return hasWinningCondition(_boardData);
  }

}

export default Board;