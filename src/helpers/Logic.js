export const clearLines = board => {
  const rowsToClear = [];

  board.map((row, i) => {
    if (row.every(x => x)) {
      rowsToClear.push(i);
    }
  });

  rowsToClear.map(i => {
    board.splice(i, 1);
    board.unshift(new Array(12).fill(0));
  });
};
