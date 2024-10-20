# Function to check if a number can be placed at the given position
def is_valid(board, row, col, num):
    # Check if the number is not in the current row, column, and 3x3 grid
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False

    # Check the 3x3 subgrid
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if board[i][j] == num:
                return False

    return True

# Backtracking function to solve the Sudoku
def solve_sudoku(board):
    # Find an empty spot (denoted by 0)
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                # Try placing numbers 1-9 in the empty spot
                for num in range(1, 10):
                    if is_valid(board, row, col, num):
                        board[row][col] = num  # Place the number
                        
                        if solve_sudoku(board):  # Recur to solve the rest of the board
                            return True

                        board[row][col] = 0  # Reset the spot if it leads to a dead-end

                return False  # If no number works, trigger backtracking
    return True  # Sudoku solved if no empty spots left

# Function to print the Sudoku board
def print_board(board):
    for row in board:
        print(" ".join(str(num) if num != 0 else "." for num in row))

# Example Sudoku puzzle (0 denotes empty spots)
sudoku_board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

# Solve the puzzle and print the result
if solve_sudoku(sudoku_board):
    print("Sudoku solved:")
    print_board(sudoku_board)
else:
    print("No solution exists for the given Sudoku puzzle.")
