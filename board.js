const chalk = require('chalk');

function printLetters() {
  let line = '  '; // spasi untuk nomor baris kiri
  const cols = ['a','b','c','d','e','f','g','h'];
  for (const c of cols) {
    line += ` ${c} `;
  }
  line += ' ';
  console.log(line);
}

function printBoard(board) {
  printLetters();

  for (let row = 0; row < 8; row++) {
    let line = (8 - row) + ' '; // nomor baris kiri

    for (let col = 0; col < 8; col++) {
      const piece = board[row][col] === ' ' ? ' ' : board[row][col];
      const isBlackSquare = (row + col) % 2 === 1;
      const content = ` ${piece} `;

      if (isBlackSquare) {
        line += chalk.bgBlack.white(content);
      } else {
        line += chalk.bgWhite.black(content);
      }
    }

    line += ' ' + (8 - row); // nomor baris kanan
    console.log(line);
  }

  printLetters();
}

// Contoh papan standar
let board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // baris 0 (hitam, huruf kecil)
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // baris 1 (hitam)
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // baris 2
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // baris 3
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // baris 4
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // baris 5
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // baris 6 (putih, huruf besar)
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // baris 7 (putih)
];

function resetBoard() {
  board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];
  return board;
}

module.exports = {
  board,
  printBoard,
  resetBoard
};
