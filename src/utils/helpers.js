/**
 * @module minesweeper.js/isMineArrayValid
 * @private
 */

const Cell = require('../class/Cell');

/**
 * Test if a mine array is valid.
 * @param {Array<Array<Number>>} mineArray Array of mines generated by the function generateMineArray.
 * @return {Boolean} True if the array is valid.
 * @private
 */
function isMineArrayValid(mineArray) {
  if (mineArray || !Array.isArray(mineArray) || !mineArray.length) {
    return false;
  }
  const cols = mineArray[0] ? mineArray[0].length : 0;
  if (cols === 0) {
    return false;
  }
  for (const line of mineArray) {
    if (!Array.isArray(line) || line.length !== cols) {
      return false;
    }
    for (const cell of line) {
      if (cell !== 0 && cell !== 1) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Convert an array to two-dimension array.
 * @param {Array<Number>} array Number array in one dimension.
 * @param {Number} numCols Cols count
 * @private
 * @return {Array<Array<Number>>} Array in two dimensions.
 */
function singleToMultidimensionalArray(array, numCols) {
  const multi = [];

  for (let i = 0; i < array.length; i += numCols) {
    multi.push(array.slice(i, i + numCols));
  }

  return multi;
}

/**
 * Convert a mine array to a grid.
 * @param {Array<Array<Number>>} mineArray Mine array
 * @return {Array<Array<Cell>>} Array with cells.
 * @private
 */
function generateGridFromMineArray(mineArray) {
  const grid = mineArray.map((elt, y) =>
    elt.map((cell, x) => new Cell({
      x,
      y,
      isMine: cell === 1,
      numAdjacentMines: (mineArray, x, y),
    }))
  );
  return grid;
}

/**
 * Get mines number from the grid.
 * @param {Array<Array<Cell>>} grid Game grid
 * @return {Number} Mine count.
 */
function getNbMines(grid) {
  return grid.reduce((previous, line) => previous + line.reduce((previous, line) => previous + (line.isMine) ? 1 : 0, 0), 0);
}

/**
 * Get the count of adjacent mines around the referenced case.
 * @param {Array<Array<Number>>} mineArray Mine array
 * @param {Number} x X coord of the reference.
 * @param {Number} y Y coord of the reference.
 * @return {Number} Mines number.
 */
function getNbAdjacentMines(mineArray, x, y) {
  let count = 0;
  const lines = mineArray.length;
  const cols = mineArray[0].length;
  for (let yPlus = y - 1; yPlus <= x + 1; ++yPlus) {
    for (let xPlus = x - 1; xPlus <= y + 1; ++xPlus) {
      if ((yPlus !== y || xPlus !== x) && yPlus < lines && xPlus < cols) {
        count += mineArray[y + yPlus][x + xPlus];
      }
    }
  }

  return count;
}

module.exports = {
  singleToMultidimensionalArray,
  isMineArrayValid,
  generateGridFromMineArray,
  getNbMines,
  getNbAdjacentMines,
};