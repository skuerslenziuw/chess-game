const { isValidMove } = require('../game');

describe('isValidMove - Validasi Gerakan Bidak', () => {
  let emptyBoard;

  beforeEach(() => {
    // Buat papan kosong 8x8
    emptyBoard = Array(8).fill(null).map(() => Array(8).fill(' '));
  });

  test('Pawn - maju 1 langkah', () => {
    emptyBoard[6][0] = 'P'; // white pawn di a2
    expect(isValidMove(emptyBoard, {row:6, col:0}, {row:5, col:0}, 'white')).toBe(true);
  });

  test('Pawn - maju 2 langkah dari posisi awal', () => {
    emptyBoard[6][0] = 'P';
    expect(isValidMove(emptyBoard, {row:6, col:0}, {row:4, col:0}, 'white')).toBe(true);
  });

  test('Pawn - tangkap diagonal', () => {
    emptyBoard[6][1] = 'P';
    emptyBoard[5][2] = 'p'; // black pawn sebagai target
    expect(isValidMove(emptyBoard, {row:6, col:1}, {row:5, col:2}, 'white')).toBe(true);
  });

  test('Pawn - tidak bisa maju 2 langkah jika jalur terhalang', () => {
    emptyBoard[6][0] = 'P';
    emptyBoard[5][0] = 'p'; // terhalang
    expect(isValidMove(emptyBoard, {row:6, col:0}, {row:4, col:0}, 'white')).toBe(false);
  });

  test('Knight - valid move', () => {
    emptyBoard[7][1] = 'N'; // white knight di b1
    expect(isValidMove(emptyBoard, {row:7, col:1}, {row:5, col:2}, 'white')).toBe(true);
  });

  test('Bishop - valid diagonal move dengan jalur clear', () => {
    emptyBoard[7][2] = 'B';
    expect(isValidMove(emptyBoard, {row:7, col:2}, {row:5, col:4}, 'white')).toBe(true);
  });

  test('Bishop - invalid move jika jalur terhalang', () => {
    emptyBoard[7][2] = 'B';
    emptyBoard[6][3] = 'P'; // terhalang di d2
    expect(isValidMove(emptyBoard, {row:7, col:2}, {row:5, col:4}, 'white')).toBe(false);
  });

  test('Rook - valid move horizontal dan vertikal', () => {
    emptyBoard[7][0] = 'R';
    expect(isValidMove(emptyBoard, {row:7, col:0}, {row:7, col:5}, 'white')).toBe(true);
    expect(isValidMove(emptyBoard, {row:7, col:0}, {row:4, col:0}, 'white')).toBe(true);
  });

  test('Rook - invalid move jika jalur terhalang', () => {
    emptyBoard[7][0] = 'R';
    emptyBoard[6][0] = 'P'; // terhalang
    expect(isValidMove(emptyBoard, {row:7, col:0}, {row:4, col:0}, 'white')).toBe(false);
  });

  test('Queen - valid diagonal dan lurus', () => {
    emptyBoard[7][3] = 'Q';
    expect(isValidMove(emptyBoard, {row:7, col:3}, {row:4, col:0}, 'white')).toBe(true); // diagonal
    expect(isValidMove(emptyBoard, {row:7, col:3}, {row:7, col:6}, 'white')).toBe(true); // horizontal
    expect(isValidMove(emptyBoard, {row:7, col:3}, {row:3, col:3}, 'white')).toBe(true); // vertical
  });

  test('Queen - invalid jika jalur terhalang', () => {
    emptyBoard[7][3] = 'Q';
    emptyBoard[6][3] = 'P'; // terhalang
    expect(isValidMove(emptyBoard, {row:7, col:3}, {row:3, col:3}, 'white')).toBe(false);
  });

  test('King - valid gerak 1 langkah ke segala arah', () => {
    emptyBoard[7][4] = 'K';
    expect(isValidMove(emptyBoard, {row:7, col:4}, {row:6, col:4}, 'white')).toBe(true);
    expect(isValidMove(emptyBoard, {row:7, col:4}, {row:6, col:3}, 'white')).toBe(true);
  });

  test('King - invalid jika gerak lebih dari 1 langkah', () => {
    emptyBoard[7][4] = 'K';
    expect(isValidMove(emptyBoard, {row:7, col:4}, {row:5, col:4}, 'white')).toBe(false);
  });

  test('Tidak boleh gerak bidak lawan di giliran tertentu', () => {
    emptyBoard[7][4] = 'k'; // king hitam
    expect(isValidMove(emptyBoard, {row:7, col:4}, {row:6, col:4}, 'white')).toBe(false);
  });

  test('Tidak boleh menyerang bidak sendiri', () => {
    emptyBoard[7][4] = 'K';
    emptyBoard[6][4] = 'P'; // bidak sendiri
    expect(isValidMove(emptyBoard, {row:7, col:4}, {row:6, col:4}, 'white')).toBe(false);
  });
});
