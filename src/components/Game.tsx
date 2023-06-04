import React, { useEffect, useRef, useState } from 'react'
import Grid from './Grid';
import './Game.css'
interface GameProps {
  rows: number;
  cols: number;
}
const Game = ({ rows, cols }: GameProps) => {

  const [gridState, setGridState] = useState<boolean[][]>([])
  const [startSim, setStartSim] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStartSim(false);
    const grid: boolean[][] = []
    for (let i = 0; i < rows; i++) {
      grid.push(Array.from(Array(cols), () => Math.random() < 0.5));
    }
    setGridState(grid)
  }, [reset])

  useEffect(() => {
    if (startSim) {
      timerRef.current = setInterval(() => {
        updateGrid();
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [startSim]);

  const updateGrid = () => {
    setGridState((prevGrid) => {
      const newGrid = [];
      for (let i = 0; i < rows; i++) {
        newGrid.push(Array.from(Array(cols), () => false));
      }
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbours = countNeighbour(prevGrid, i, j);
          const currentCell = prevGrid[i][j];
          if (currentCell && (neighbours < 2 || neighbours > 3)) {
            newGrid[i][j] = false; // Underpopulation or overpopulation,Cell Dies.
          } else if (!currentCell && neighbours === 3) {
            newGrid[i][j] = true; // Cell Click or exact 3 neighbours,Cell becomes alive.
          } else {
            newGrid[i][j] = currentCell; // Cell remains the same
          }
        }
      }
      return newGrid;
    });
    // const newGrid = [];
    // for(let i=0;i<rows;i++){
    //     newGrid.push(Array.from(Array(cols), ()=>false));
    // }
    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         const neighbours = countNeighbour(gridState,i,j);
    //         const currentCell = gridState[i][j];

    //         if (currentCell && (neighbours < 2 || neighbours > 3)) {
    //             newGrid[i][j] = false; // Cell dies
    //           } else if (!currentCell && neighbours === 3) {
    //             newGrid[i][j] = true; // Cell becomes alive
    //           } else {
    //             newGrid[i][j] = currentCell; // Cell remains the same
    //           }
    //     }
    // }
    // setGridState(newGrid)
  }

  const countNeighbour = (gridState: boolean[][], row: number, col: number) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;

        // Check if the neighbor is within the grid boundaries
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          count += gridState[newRow][newCol] ? 1 : 0;
        }
      }
    }
    return count;
  }
  const handleCellClick = ({ row, col }: { row: number; col: number }) => {
    const newGrid = [...gridState];
    newGrid[row][col] = !newGrid[row][col];

    setGridState(newGrid);
  }

  const handleStartClick = () => {
    setStartSim(!startSim);
  };

  const handleStopClick = () => {
    setStartSim(false);
  }
  return (
    <div className='game-container'>
      <Grid grid={gridState} onCellClick={handleCellClick} />
      <div className='button-container'>
        <button className='next-gen-btn' onClick={updateGrid}>Next Generation</button>
        {startSim ? (
          <button className='stop-btn' onClick={handleStopClick}>Stop</button>

        ) :
          (
            <button className='start-btn' onClick={handleStartClick}>Start</button>
          )
        }
        <button className='reset-btn' onClick={() => { setReset(!reset) }}>Reset</button>

      </div>

    </div>
  )
}

export default Game