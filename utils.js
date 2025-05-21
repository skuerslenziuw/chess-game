function isWhite(piece) {
  return piece === piece.toUpperCase();
}

function isBlack(piece) {
  return piece === piece.toLowerCase();
}

// Konversi notasi catur "e2" ke indeks array [row, col]
function notationToIndex(notation) {
  if (!notation || notation.length !== 2) return null;

  const files = 'abcdefgh';
  const file = files.indexOf(notation[0]);
  const rank = 8 - parseInt(notation[1], 10);

  if (file === -1 || isNaN(rank) || rank < 0 || rank > 7) return null;

  return { row: rank, col: file };
}

// Konversi indeks array ke notasi catur "e2"
function indexToNotation(row, col) {
  const file = String.fromCharCode('a'.charCodeAt(0) + col);
  const rank = 8 - row;
  return file + rank;
}

module.exports = {
  notationToIndex,
  indexToNotation,
  isWhite,
  isBlack
};
