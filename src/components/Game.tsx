import React, { useContext, useEffect, useRef, useState } from 'react'
import Grid from './Grid';
import './Game.css'
import DropDown from './DropDown/DropDown';
import { GameContext } from '../context/Context';

const Game = () => {
  const { gridState, setGridState, startSim, setStartSim, updateGrid, reset, setReset,setRows,setCols } = useContext(GameContext)
  // const [dimensions,setDimensions] = useState(20)
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
  };

  const handleResize = ()=>{
    // setRows(dimensions)
    // setCols(dimensions)
  }
  return (
    <div className='game-container'>

      <div className='button-container'>
        <button className='next-gen-btn' onClick={updateGrid}>Next Generation</button>
        {startSim ? (
          <button className='stop-btn' onClick={handleStopClick}>Stop</button>
        ) :
          (
            <>
              <button className='start-btn' onClick={handleStartClick}>Start</button>
              {/* <input type="number" value={dimensions} onChange={(e)=>setDimensions(parseInt(e.target.value))}/>
              <button className='resize-btn' onClick={handleResize}>Resize</button> */}
            </>
          )
        }
        <button className='reset-btn' onClick={() => { setReset(!reset) }}>Reset</button>
        <DropDown />
      </div>
      <Grid grid={gridState} onCellClick={handleCellClick} />

    </div>
  )
}

export default Game