
import { useState } from 'react';
import { useEngine } from './Engine';
import './Soduku.css';

function Soduku() {
  const [board, setBoard] = useState(Array.from(Array(9), () => new Array(9).fill('')))
  const [nosolution, setNoSolution] = useState(false);
  const solveSodoku = useEngine(board);

  const onChangeInputItem = (value, row, col) => {
      const intValue = parseInt(value);
      if((value !== '' && !isNaN(intValue) &&
         intValue >= 1 && intValue <=9) || value === '') {
        const newBoard = Array.from(board);
        newBoard[row][col] = value.trim();
        setBoard(newBoard);
      }
  }

  const startSolvingSoduku = () => {
    if(!solveSodoku()) {
      setNoSolution(true);
    }
  }

  return (
   <div className='container'>
     <h1 className='heading'>
        SUDOKU SOLVER
     </h1>
     <h4 className='subheading'>Fill your sodoku puzzle here</h4>
     <div className='board_container'>
        {
          board.map((row, rowIndex) => {
            const bottomborder = rowIndex === 2 || rowIndex === 5 ? 'hightlight_bottom_border' : '';
            const topBorder = rowIndex === 3 || rowIndex === 6 ? 'hightlight_top_border' : '';
            return (
              <div key={rowIndex}>
                {
                  row.map((item, colIndex) => {
                    const rightBorder = colIndex === 2 || colIndex === 5 ? 'hightlight_right_border' : '';
                    const leftBorder = colIndex === 3 || colIndex === 6 ? 'hightlight_left_border' : '';
                    return <input type="text"
                                  className={`box ${rightBorder} ${bottomborder} ${leftBorder} ${topBorder}`}
                                  onChange={(e) => onChangeInputItem(e.target.value, rowIndex, colIndex)}
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
     </div>
     {
       nosolution && <div>No solution exist</div>
     }
    </div>
  );
}

export default Soduku;



