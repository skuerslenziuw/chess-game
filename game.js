const { notationToIndex, indexToNotation, isWhite, isBlack } = require('./utils'); 

function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function isUpper(char) {
  return char === char.toUpperCase();
}

function isOpponent(piece1, piece2) {
  if (piece1 === ' ' || piece2 === ' ') return false;
  return (isUpper(piece1) && !isUpper(piece2)) || (!isUpper(piece1) && isUpper(piece2));
}

function isValidKnightMove(from, to) {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isPathClear(board, from, to) {
  const rowStep = Math.sign(to.row - from.row);
  const colStep = Math.sign(to.col - from.col);

  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;

  while (currentRow !== to.row || currentCol !== to.col) {
    if (board[currentRow][currentCol] !== ' ') {
      return false;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }
  return true;
}

function isValidMove(board, from, to, turn) {
  if (!from || !to || from.row === undefined || from.col === undefined || to.row === undefined || to.col === undefined) {
    return false;
  }

  if (!isValidPosition(from.row, from.col) || !isValidPosition(to.row, to.col)) {
    return false;
  }

  const piece = board[from.row][from.col];
  if (!piece || piece === ' ') return false;

  // Pastikan giliran benar (white/black)
  if (turn === 'white' && !isWhite(piece)) return false;
  if (turn === 'black' && !isBlack(piece)) return false;

  const target = board[to.row][to.col];

  // Jangan boleh menyerang diri sendiri
  if (target !== ' ' && !isOpponent(piece, target)) {
    return false;
  }

  const rowDiff = to.row - from.row;
  const colDiffAbs = Math.abs(to.col - from.col);
  const rowDiffAbs = Math.abs(rowDiff);

  switch (piece.toLowerCase()) {
    case 'p': {
      const direction = isWhite(piece) ? -1 : 1;
      const startRow = isWhite(piece) ? 6 : 1;

      // Maju 1 langkah
      if (colDiffAbs === 0 && rowDiff === direction && target === ' ') {
        return true;
      }

      // Maju 2 langkah dari posisi awal
      if (
        colDiffAbs === 0 &&
        rowDiff === direction * 2 &&
        from.row === startRow &&
        board[from.row + direction][from.col] === ' ' &&
        target === ' '
      ) {
        return true;
      }

      // Tangkap diagonal
      if (
        colDiffAbs === 1 &&
        rowDiff === direction &&
        target !== ' ' &&
        isOpponent(piece, target)
      ) {
        return true;
      }

      return false;
    }

    case 'n':
      // Knight
      return isValidKnightMove(from, to);

    case 'b':
      // Bishop: gerak diagonal dan jalur harus clear
      if (rowDiffAbs === colDiffAbs && rowDiffAbs > 0) {
        return isPathClear(board, from, to);
      }
      return false;

    case 'r':
      // Rook: gerak lurus (baris atau kolom sama), jalur harus clear
      if ((rowDiff === 0 && colDiffAbs > 0) || (colDiffAbs === 0 && rowDiffAbs > 0)) {
        return isPathClear(board, from, to);
      }
      return false;

    case 'q':
      // Queen: gabungan rook & bishop
      if (
        (rowDiffAbs === colDiffAbs && rowDiffAbs > 0) ||
        (rowDiff === 0 && colDiffAbs > 0) ||
        (colDiffAbs === 0 && rowDiffAbs > 0)
      ) {
        return isPathClear(board, from, to);
      }
      return false;

    case 'k':
      // King: gerak 1 langkah ke segala arah
      if (rowDiffAbs <= 1 && colDiffAbs <= 1) {
        return true;
      }
      return false;

    default:
      return false;
  }
}

function makeMove(board, from, to) {
  const piece = board[from.row][from.col];
  board[to.row][to.col] = piece;
  board[from.row][from.col] = ' ';
}

function isKingCaptured(board, color) {
  const king = color === 'white' ? 'K' : 'k';
  for (let row of board) {
    if (row.includes(king)) {
      return false;
    }
  }
  return true;
}

function validatePlayerMoveInput(board, fromNotation, toNotation, turn) {
 if (!fromNotation || !toNotation) {
    return { valid: false, error: 'Input posisi tidak boleh kosong' };
  }

  const from = notationToIndex(fromNotation);
  const to = notationToIndex(toNotation);

  if (!from || !to) {
    return { valid: false, error: 'Format input posisi salah' };
  }

  if (!isValidPosition(from.row, from.col) || !isValidPosition(to.row, to.col)) {
    return { valid: false, error: 'Posisi di luar papan' };
  }

  const piece = board[from.row][from.col];
  if (!piece || piece === ' ') {
    return { valid: false, error: `Tidak ada bidak di posisi ${fromNotation}` };
  }

  if (turn === 'white' && !isWhite(piece)) {
    return { valid: false, error: `Giliran white, tapi bidak di ${fromNotation} bukan white` };
  }

  if (turn === 'black' && !isBlack(piece)) {
    return { valid: false, error: `Giliran black, tapi bidak di ${fromNotation} bukan black` };
  }

  return { valid: true, from, to };
}

function safeMakeMove(board, from, to, turn) {
  if (isValidMove(board, from, to, turn)) {
    makeMove(board, from, to);
    return { success: true };
  } else {
    return { success: false, error: 'Langkah tidak valid' };
  }
}

module.exports = {
  isValidPosition,
  isValidMove,
  makeMove,
  isKingCaptured,
  safeMakeMove
};

module.exports.validatePlayerMoveInput = validatePlayerMoveInput;
