import Board from '../Board/index.js';
import { PIECE } from '../constants/index.js';
import { cloneDeep, flatten } from 'lodash';
const SEARCH_DEPTH = 5;

const getMoves = (board, color) => {
  let output = [];
  let b;
  if (Array.isArray(board)) {
    b = new Board(board);
  } else {
    b = board;
  }

  for (let i = 1; i <= 7; i++) {
    const index = i - 1;
    if (b.isValidMove(index)) {
      b.insertPiece(i, color);
      output.push(cloneDeep(b._boardData));
      b.removePiece(i);
    }
  }

  return output;
};

const getInitialMoves = () => {
  // this should return an object, ex:
  // { boardData: [[ BOARD ARRAY ]], column: 1 };




};

const prune = (ply) => {

};

const winningProbability = (board) => {
  let turn = PIECE.BLUE;
  let output;

  //TODO: Do not calculate invalid board positions or bad branches 
  function breadthFirstSearch(depth, lastPly) {
    if (depth === 0) {
      return lastPly;
    }

    const currentPly = flatten(lastPly.map((move) => getMoves(move, turn)));
    turn = turn === PIECE.BLUE ? PIECE.RED : PIECE.BLUE;
    return breadthFirstSearch(--depth, currentPly);
  }
  const scores = breadthFirstSearch(SEARCH_DEPTH, [board]).map((board) => score(board));
  const max = scores.filter((score) => score > 0).length / scores.length;
  const min = scores.filter((score) => score < 0).length / scores.length;
  return max - min;
};

export const score = (board) => {
  const b = new Board(board);
  const winning = b.winningCondition();

  if (winning) {
    return PIECE.RED === winning ? 1000 : -1000;
  }

  return 0;
};

export const calculateBestMove = (board) => {
  const initialMoves = getMoves(board, PIECE.RED);

  const winningProbabilities = initialMoves.map((board) => winningProbability(board));
  console.log(winningProbabilities, '<<<< Winning Probabilities');

  let highestProbability;
  let last = -1000;
  let greatestIndex = 0;
  winningProbabilities.forEach((probability, i) => {
    if (probability > last) {
      last = probability;
      greatestIndex = i;
    }
  });

  return greatestIndex === 0 || !board.isValidMove(greatestIndex) ? null : ++greatestIndex;
};

