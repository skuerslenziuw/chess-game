const { validatePlayerMoveInput } = require('../game');

describe('validatePlayerMoveInput - Validasi input pemain dan error handling', () => {
  let board;

  beforeEach(() => {
    board = Array(8).fill(null).map(() => Array(8).fill(' '));
    board[6][4] = 'P'; // white pawn e2
    board[1][4] = 'p'; // black pawn e7
  });

  test('Input kosong', () => {
    expect(validatePlayerMoveInput(board, '', 'e4', 'white')).toEqual({
      valid: false,
      error: 'Input posisi tidak boleh kosong'
    });
  });

  test('Format input salah', () => {
    expect(validatePlayerMoveInput(board, 'z9', 'e4', 'white')).toEqual({
      valid: false,
      error: 'Format input posisi salah'
    });
  });

    test('Posisi di luar papan', () => {
    // Misal kita pakai 'a0' yang formatnya salah karena angka di bawah 1
    expect(validatePlayerMoveInput(board, 'a0', 'e4', 'white')).toEqual({
        valid: false,
        error: 'Format input posisi salah'
    });
    });

  test('Tidak ada bidak di posisi from', () => {
    expect(validatePlayerMoveInput(board, 'e3', 'e4', 'white')).toEqual({
      valid: false,
      error: 'Tidak ada bidak di posisi e3'
    });
  });

  test('Giliran white tapi bidak hitam yang dipilih', () => {
    expect(validatePlayerMoveInput(board, 'e7', 'e5', 'white')).toEqual({
      valid: false,
      error: 'Giliran white, tapi bidak di e7 bukan white'
    });
  });

  test('Giliran black tapi bidak putih yang dipilih', () => {
    expect(validatePlayerMoveInput(board, 'e2', 'e4', 'black')).toEqual({
      valid: false,
      error: 'Giliran black, tapi bidak di e2 bukan black'
    });
  });

  test('Input valid', () => {
    const res = validatePlayerMoveInput(board, 'e2', 'e4', 'white');
    expect(res.valid).toBe(true);
    expect(res.from).toEqual({row:6, col:4});
    expect(res.to).toEqual({row:4, col:4});
  });
});
