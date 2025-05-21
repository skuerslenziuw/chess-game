const { board } = require('../board');

describe('Initial Board Setup', () => {
  test('Baris 0 adalah bidak putih (huruf kecil)', () => {
    expect(board[0]).toEqual(['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']);
  });

  test('Baris 1 adalah bidak putih (huruf kecil)', () => {
    expect(board[1]).toEqual(['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']);
  });

  test('Baris 6 adalah bidak hitam (huruf besar)', () => {
    expect(board[6]).toEqual(['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']);
  });

  test('Baris 7 adalah bidak hitam (huruf besar)', () => {
    expect(board[7]).toEqual(['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']);
  });
});
