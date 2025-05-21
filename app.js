const readline = require('readline');
const { board, printBoard } = require('./board');
const { notationToIndex } = require('./utils');
const { isValidMove, makeMove, isKingCaptured } = require('./game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentTurn = 'white'; // giliran pemain putih dulu

function switchTurn() {
  currentTurn = currentTurn === 'white' ? 'black' : 'white';
}

function isValidInputFormat(input) {
  const regex = /^[a-h][1-8] [a-h][1-8]$/;
  return regex.test(input.trim());
}

// console.log('Program dimulai...');

function promptMove() {
//   console.log('promptMove() dipanggil');
  printBoard(board); // Menampilkan papan sebelum pemain bergerak
  console.log(`Sekarang giliran: Pemain ${currentTurn === 'white' ? 'Putih' : 'Hitam'}`);

  rl.question("Masukkan langkahmu (format: e2 e4): ", (input) => {
    if (!isValidInputFormat(input)) {
      console.log("Format salah! Gunakan format seperti 'e2 e4' (a-h dan 1-8).");
      return promptMove();
    }

    const parts = input.trim().split(' ');
    const from = notationToIndex(parts[0]);
    const to = notationToIndex(parts[1]);

    if (!from || !to) {
      console.log("Posisi tidak valid.");
      return promptMove();
    }

    if (!isValidMove(board, from, to, currentTurn)) {
      console.log("Langkah tidak valid.");
      return promptMove();
    }

    makeMove(board, from, to);
    console.log("Langkah dijalankan.");

    const opponentColor = currentTurn === 'white' ? 'black' : 'white';
    if (isKingCaptured(board, opponentColor)) {
      printBoard(board);
      console.log(`${opponentColor === 'white' ? 'Putih' : 'Hitam'} kalah, Raja tertangkap.`);
      rl.close();
      return;
    }

    switchTurn();
    promptMove();
  });
}

promptMove();
