import React, { useContext, useEffect, useRef, useState } from 'react'
import Grid from './Grid';
import './Game.css'
import DropDown from './DropDown/DropDown';
import { GameContext } from '../context/Context';

const Game = () => {
  const { gridState, setGridState, startSim, setStartSim, updateGrid, reset, setReset, setRows, setCols, currentlyAliveCells, currentlyDeadCells } = useContext(GameContext)
  const [dimensions, setDimensions] = useState(40)
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

  const handleResize = () => {
    setRows(dimensions)
    setCols(dimensions)
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
              <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <input type="number" value={dimensions} onChange={(e) => setDimensions(parseInt(e.target.value))} />
                <button className='resize-btn' onClick={handleResize}>Resize</button>
              </div>
            </>
          )
        }
        <button className='reset-btn' onClick={() => { setReset(!reset) }}>Reset</button>
        <DropDown />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <div >Born: {currentlyAliveCells}</div>
          <div>Dead: {currentlyDeadCells}</div>
        </div>
      </div>
      <div>
        <Grid grid={gridState} onCellClick={handleCellClick} />
      </div>

    </div>
  )
}

export default Game