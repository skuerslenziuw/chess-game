// __tests__/game.test.js
const { board, resetBoard } = require('../board');
const { isValidMove, isKingCaptured } = require('../game');
const { notationToIndex } = require('../utils');

describe('Chess Move Validation', () => {
  beforeEach(() => {
    resetBoard(); // Reset papan sebelum setiap test
  });

  test('Langkah valid: pion putih e2 ke e3', () => {
    const from = notationToIndex('e2'); // [6,4]
    const to = notationToIndex('e3');   // [5,4]
    const result = isValidMove(board, from, to, 'white');
    expect(result).toBe(true);
  });

  test('Langkah tidak valid: pion putih e2 ke e1 (mundur)', () => {
    const from = notationToIndex('e2'); // [6,4]
    const to = notationToIndex('e1');   // [7,4]
    const result = isValidMove(board, from, to, 'white');
    expect(result).toBe(false);
  });

  test('Langkah valid: kuda hitam b8 ke c6', () => {
    const from = notationToIndex('b8'); // [0,1]
    const to = notationToIndex('c6');   // [2,2]
    const result = isValidMove(board, from, to, 'black');
    expect(result).toBe(true);
  });

  test('Langkah tidak valid: kuda hitam b8 ke b6 (gerak lurus)', () => {
    const from = notationToIndex('b8'); // [0,1]
    const to = notationToIndex('b6');   // [2,1]
    const result = isValidMove(board, from, to, 'black');
    expect(result).toBe(false);
  });
});

describe('Win Condition - King Capture', () => {
  test('Raja putih masih ada di papan', () => {
    const board = [
      ['r','n','b','q','k','b','n','r'],
      ['p','p','p','p','p','p','p','p'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['P','P','P','P','P','P','P','P'],
      ['R','N','B','Q','K','B','N','R'],
    ];
    expect(isKingCaptured(board, 'white')).toBe(false);
  });

  test('Raja hitam sudah tertangkap (hilang dari papan)', () => {
    const boardWithoutBlackKing = [
      ['r','n','b','q',' ','b','n','r'],  // 'k' hilang di sini
      ['p','p','p','p','p','p','p','p'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['P','P','P','P','P','P','P','P'],
      ['R','N','B','Q','K','B','N','R'],
    ];
    expect(isKingCaptured(boardWithoutBlackKing, 'black')).toBe(true);
  });
});
