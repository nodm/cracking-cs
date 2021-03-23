function checkGrid(grid) {
  if (!Array.isArray(grid)) {
    throw new TypeError('An array should be provided as sudoku board');
  }

  const size = grid.length;

  for (const line of grid) {
    if (!Array.isArray(line)) {
      throw new TypeError('An array should be provided as sudoku board');
    }
    if (line.length !== size) {
      throw new TypeError('A square array should be provided as sudoku board');
    }
  }
}

function cloneGrid(grid) {
  return grid.reduce((clonedBoard, line) => [...clonedBoard, [...line]] , []);
}

function getFirstEmptyCellIndex(grid) {
  for (let row = 0; row < grid.length; row += 1) {
    for (let column = 0; column < grid.length; column += 1) {
      if (grid[row][column] === 0) {
        return [row, column];
      }
    }
  }
  return null;
}

function getGridRowValues(grid, rowNumber) {
  return grid[rowNumber];
}

function getGridColumnValues(grid, columnNumber) {
  return grid.map(line => line[columnNumber]);
}

function getGridRegionValues(grid, row, column) {
  const squareSize = Math.sqrt(grid.length);
  const values = [];
  const rowStartIndex = squareSize * Math.floor(row / squareSize);
  const columnStartIndex = squareSize * Math.floor(column / squareSize);

  for (let k = rowStartIndex; k < rowStartIndex + squareSize; k += 1) {
    for (let l = columnStartIndex; l < columnStartIndex + squareSize; l += 1) {
      values.push(grid[k][l]);
    }
  }
  return values;
}

function isCellValueValid(grid, value, row, column) {
  if (Sudoku.getGridLineValues(grid, row).includes(value)) {
    return false;
  }
  if (Sudoku.getBoardColumnValues(grid, column).includes(value)) {
    return false;
  }

  return !Sudoku.getBoardSquareValues(grid, row, column).includes(value);
}

function isGridSolved(grid) {
  if (getFirstEmptyCellIndex(grid)) {
    return false;
  }

  const indexes = new Array(grid.length).fill(0).map((_, i) => i);

  if (indexes.some(index => new Set(getGridRowValues(grid, index)).size !== grid.length)) {
    return false;
  }

  if (indexes.some(index => new Set(getGridColumnValues(grid, index)).size !== grid.length)) {
    return false;
  }

  const squareSize = Math.sqrt(grid.length);
  for (let i = 0; i < squareSize; i += 1) {
    const index = i * squareSize;
    if (new Set(getGridRegionValues(grid, index, index)).size !== grid.length) {
      return false;
    }
  }

  return true;
}

function solve(grid) {
  const emptyCell = getFirstEmptyCellIndex(grid);

  if (!emptyCell) {
    return isGridSolved(grid) ? grid : null;
  }

  const [row, column] = emptyCell;
  const cellValues = new Array(grid.length).fill(0).map((_, index) => index + 1);

  for(let currentCellValue of cellValues) {
    if (isCellValueValid(grid, currentCellValue, row, column)) {
      const gridWithNewValue = cloneGrid(grid);
      gridWithNewValue[row][column] = currentCellValue;
      const solution = solve(gridWithNewValue);
      if (solution) {
        return solution;
      }
    }
  }

}

function solveSudoku(grid) {
  checkGrid(grid);
  return solve(grid);
}

module.exports = { solveSudoku };
