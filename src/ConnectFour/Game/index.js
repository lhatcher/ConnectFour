import Board from '../Board/index.js';
import { calculateBestMove } from './evaluation.js';
import { INVALID_MOVE } from '../constants/errors.js';
import { DIFFICULTY, PIECE } from '../constants/index.js';
import { WINNING, WELCOME, MENU } from '../constants/messages.js';
import { printCongrats } from '../utils.js';
import { printInfo, printError } from '../utils.js';
import prompt from 'prompt';

class Game {

  constructor() {
    this._board = new Board();
    this._turn = PIECE.BLUE;
    this._difficultySetting;
    printInfo('GAME INITIALIZED');
    this.showMenu();
  }

  loop() {
    const { _board, _turn } = this;

    const winning = _board.winningCondition();

    if (winning) {
      if (winning === PIECE.BLUE) {
        this.displayWinningMessage(PIECE.BLUE);
      } else {
        this.displayWinningMessage(PIECE.RED);
      }
      return;
    }

    if (_turn === PIECE.BLUE) {
      prompt.get(['move'], (err, input) => {
        const success = _board.insertPiece(input.move, PIECE.BLUE);
        if (success) {
          this._turn = PIECE.RED;
        }
        _board.printBoard();
        this.loop();
      });
    } else {
      this.executeComputerTurn();
      _board.printBoard();
      this.loop();
    }
  }

  startTurn() {
    this._turn = this._turn === PIECE.RED ? PIECE.BLUE : PIECE.RED;
  }

  displayWinningMessage(winner) {
    this._board.printBoard();
    printCongrats(WINNING[winner]);
    prompt.get(['play_again?'], (err, input) => {
      this._board = new Board();
      this.loop();
    })
  }

  executeComputerTurn() {
    let rand = Math.round(Math.random() * 7);

    console.time('calculateBestMove');
    const bestMove = calculateBestMove(this._board);
    console.timeEnd('calculateBestMove');

    const move = bestMove || rand;
    const success = this._board.insertPiece(move, PIECE.RED);
    if (success) {
      this._turn = PIECE.BLUE;
    }
  }

  showMenu() {
    printInfo(WELCOME);
    printInfo(MENU);
    prompt.get(['option'], (err, input) => {
      if (input.option <= MENU.length) {
        this._difficultySetting = input.option;
      }
      this._board.printBoard();
      this.loop();
    });
  }

}

export default Game;