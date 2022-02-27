import { useState } from "react"

const GRID_SIZE = 9;
const SUB_GRID_SIZE = 3;

export const useEngine = (gameBoard) => {
    const [board, setBoard] = useState(gameBoard);
    const solveSodoku = () => {
        let row = 0, col = 0;
        let isPuzzleCompleted = true;
        for(row = 0; row < GRID_SIZE; row++) {
          for(col = 0; col < GRID_SIZE; col++) {
            if(board[row][col] === '') {
              isPuzzleCompleted = false;
              break;
            }
          }
          if(!isPuzzleCompleted) break;
        }

        if(isPuzzleCompleted) return true;

        for(let num = 1; num <= GRID_SIZE; num++) {
          if(isValidSudoku(row, col, num.toString())) {
            const newBoard = Array.from(board);
            newBoard[row][col] = num.toString();
            setBoard(newBoard);
            if(solveSodoku()) {
              return true;
            }
            const resetedBoard = Array.from(board);
            resetedBoard[row][col] = '';
            setBoard(resetedBoard);
          }
        }
    }

    const isValidSudoku = (row, col, num) => {
        return !availableInRow(row, num) && !availableInCol(col, num) &&
            !avilableInSubGrid(row - (row % 3), col - (col % 3), num);
    }

    const availableInRow = (row, num) => {
        for(let col = 0; col < GRID_SIZE; col++) {
            if(board[row][col] === num)
            return true;
        }
        return false;
    }

    const availableInCol = (col, num) => {
        for(let row = 0; row < GRID_SIZE; row++) {
            if(board[row][col] === num)
            return true;
        }
        return false;
    }

    const avilableInSubGrid = (gridStartRow, gridStartCol, num) => {
        for(let row = 0; row < SUB_GRID_SIZE; row++) {
        for(let col = 0; col < SUB_GRID_SIZE; col++) {
            if(board[row + gridStartRow][col + gridStartCol] === num) {
            return true;
            }
        }
        }
        return false;
    }
    return solveSodoku;
}