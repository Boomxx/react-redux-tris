import { clearLines } from "../helpers/Logic";

it("should not do anything if there are no complete lines", () => {
  //prettier-ignore
  const board = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [1, 1, 0, 1]
  ];

  //prettier-ignore
  const copy = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [1, 1, 0, 1]
  ];

  clearLines(board);

  expect(board).toEqual(copy);
});

it("should clear a single line", () => {
  //prettier-ignore
  const board = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [1, 1, 1, 1]
  ];

  clearLines(board);

  board.map(row => {
    expect(row).toEqual([0, 0, 0, 0]);
  });
});

it("should clear multiple lines", () => {
  //prettier-ignore
  const board = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ];

  clearLines(board);

  board.map(row => {
    expect(row).toEqual([0, 0, 0, 0]);
  });
});

it("should clear multiple separated lines", () => {
  //prettier-ignore
  const board = [
    [1, 1, 1, 1],
    [0, 0, 0, 0], 
    [1, 1, 1, 1]
  ];

  clearLines(board);

  board.map(row => {
    expect(row).toEqual([0, 0, 0, 0]);
  });
});

it("should leave blocks in place after clearing", () => {
  //prettier-ignore
  const board = [
    [0, 0, 0, 0], 
    [0, 1, 1, 0], 
    [1, 1, 1, 1]
  ];

  clearLines(board);

  expect(board[2]).toEqual([0, 1, 1, 0]);
});
