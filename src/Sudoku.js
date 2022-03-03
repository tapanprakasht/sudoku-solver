
import { useState } from 'react';
import { useEngine } from './Engine';
import './Sudoku.css';

function Sudoku() {
  const [board, setBoard] = useState(Array.from(Array(9), () => new Array(9).fill('')))
  const [nosolution, setNoSolution] = useState(false);
  const [solveSodoku, isValidSudoku, resetBoard] = useEngine(board);

  const onChangeInputItem = (value, row, col) => {
      const intValue = parseInt(value);
      if((value !== '' && !isNaN(intValue) &&
         intValue >= 1 && intValue <=9) || value === '') {
        const newBoard = Array.from(board);
        newBoard[row][col] = value.trim();
        setBoard(newBoard);
        if(nosolution) setNoSolution(false);
      }
  }

  const restrictInput = (event) => {
    if (event.key === '.' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  }

  const startSolvingSoduku = () => {
    if(!isValidSudoku() || !solveSodoku()) {
      setNoSolution(true);
    }
  }

  const onClickClear = () => {
    const newBoard = Array.from(Array(9), () => new Array(9).fill(''));
    setBoard(newBoard);
    resetBoard(newBoard);
  }

  return (
   <div className='container'>
     <h1 className='heading'>
        SUDOKU SOLVER
     </h1>
     <h4 className='subheading'>Fill your Sudoku puzzle here</h4>
     <div className='board_container'>
        {
          board.map((row, rowIndex) => {
            const bottomborder = rowIndex === 2 || rowIndex === 5 ? 'hightlight_bottom_border' : '';
            const topBorder = rowIndex === 3 || rowIndex === 6 ? 'hightlight_top_border' : '';
            return (
              <div className='row_style' key={rowIndex}>
                {
                  row.map((item, colIndex) => {
                    const rightBorder = colIndex === 2 || colIndex === 5 ? 'hightlight_right_border' : '';
                    const leftBorder = colIndex === 3 || colIndex === 6 ? 'hightlight_left_border' : '';
                    return <input type="number"
                                  min="1" max="9" step="1"
                                  className={`box ${rightBorder} ${bottomborder} ${leftBorder} ${topBorder}`}
                                  onKeyPress={restrictInput}
                                  onInput={(e) => onChangeInputItem(e.target.value, rowIndex, colIndex)}
                                  value={item}
                                  key={colIndex}/>
                  })
                }
              </div>
            )
          })
        }
     </div>
     <div className='button_contianer'>
       <button onClick={startSolvingSoduku}>SOLVE</button>
       <button onClick={onClickClear}>CLEAR</button>
     </div>
     <div className='result_container'>
       { nosolution && <span>No solution exist</span> }
     </div>
    </div>
  );
}

export default Sudoku;



