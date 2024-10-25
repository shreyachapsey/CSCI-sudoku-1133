// Function to create the Sudoku grid in the DOM
function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';  // Clear any previous grid
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '1');
        input.id = `cell-${i}`;
        grid.appendChild(input);
    }
}

// Function to populate the grid with a puzzle (zeros for empty cells)
function populateGrid(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i * 9 + j}`);
            if (board[i][j] !== 0) {
                cell.value = board[i][j];
                cell.disabled = true;
            } else {
                cell.value = '';
                cell.disabled = false;
            }
        }
    }
}

// Check if the number is valid for a given cell
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] == num) {
                return false;
            }
        }
    }

    return true;
}

// Solve the Sudoku puzzle using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Generate a random solved Sudoku board
function generateSudoku() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

// Remove random cells from the board to create a puzzle
function generatePuzzle() {
    const board = generateSudoku();
    const difficulty = 40;  // Number of cells to remove
    for (let i = 0; i < difficulty; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        board[row][col] = 0;
    }
    populateGrid(board);
}

// Check the user's solution
function checkSolution() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i * 9 + j}`).value;
            board[i][j] = cell === '' ? 0 : parseInt(cell);
        }
    }

    if (solveSudoku(board)) {
        document.getElementById('result').innerText = 'Correct solution!';
    } else {
        document.getElementById('result').innerText = 'Incorrect solution, please try again.';
    }
}

// Initialize the grid when the page loads
window.onload = () => {
    createGrid();
    generatePuzzle();
};
