const { safeMakeMove } = require('../game');
const { resetBoard  } = require('../board');

describe('safeMakeMove - Mencegah modifikasi papan tidak sah', () => {
  let board;

  beforeEach(() => {
    board = resetBoard ();
    board[6][4] = 'P'; // e2 (white pawn)
    board[1][4] = 'p'; // e7 (black pawn)
  });

  test('Langkah valid akan memodifikasi papan', () => {
    const result = safeMakeMove(board, { row: 6, col: 4 }, { row: 5, col: 4 }, 'white');
    expect(result.success).toBe(true);
    expect(board[6][4]).toBe(' ');
    expect(board[5][4]).toBe('P');
  });

  test('Langkah tidak valid tidak akan memodifikasi papan', () => {
    const before = JSON.stringify(board); // snapshot before
    const result = safeMakeMove(board, { row: 6, col: 4 }, { row: 4, col: 3 }, 'white'); // diagonal tanpa musuh
    const after = JSON.stringify(board); // snapshot after
    expect(result.success).toBe(false);
    expect(result.error).toBe('Langkah tidak valid');
    expect(after).toBe(before); // board tidak berubah
  });

  test('Tidak bisa mainkan giliran pemain lain', () => {
    const before = JSON.stringify(board);
    const result = safeMakeMove(board, { row: 6, col: 4 }, { row: 5, col: 4 }, 'black');
    expect(result.success).toBe(false);
    expect(after = JSON.stringify(board)).toBe(before); // papan tetap
  });
});
