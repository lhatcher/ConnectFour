import colors from 'colors';

import { 
  BOARD,
  PIECE
} from './constants/index.js';


function spaces(num) {
  let output = '';

  for (let i = 0; i < num; i ++) {
    output += ' ';
  }

  return output;
}

export const generateBoard = () => {
  const output = [];

  for (let i = 0; i < 6; i++) {
    output.push([]);
    for (let j = 0; j < 7; j++) {
      output[output.length-1].push(0);
    }
  }

  return output;
};

export const print = (data) => {
  if (typeof data !== 'string') return process.stdout.write(String(data));
  return process.stdout.write(data);
};

export const printBuffer = () => {
  print('\n\n\n');
};

export const printLabels = () => {
  startRow();
  print(colors.bold(colors.green('1 2 3 4 5 6 7 ')));
  endRow();
};

export const printBottom = () => {
  print(spaces(BOARD.MARGIN));
  print(colors.bgWhite(spaces(18)));
};

export const startRow = () => {
  print(spaces(BOARD.MARGIN));
  print(colors.bgWhite(spaces(BOARD.BORDER_SIZE)));
  print(spaces(BOARD.BORDER_PADDING));
};

export const endRow = () => {
  print(spaces(BOARD.BORDER_PADDING));
  print(colors.bgWhite(spaces(BOARD.BORDER_SIZE)));
  print('\n');
};

export const printBlue = () => {
  print(colors.bgCyan(spaces(BOARD.SPACE_SIZE)));
};

export const printRed = () => {
  print(colors.bgRed(spaces(BOARD.SPACE_SIZE)));
};

export const printEmpty = () => {
  print(spaces(BOARD.SPACE_SIZE));
};

export const printColorForSquare = (id) => {
  const printer = {
    0: printEmpty,
    1: printRed,
    2: printBlue
  }
  printer[id]();
};

export const printInfo = (data) => {
  print('\n');
  print(colors.bold(colors.cyan(data)));
  print('\n');
};

export const printError = (data) => {
  print(colors.red(data));
};

export const printCongrats = (data) => {
  print(colors.rainbow(data));
}