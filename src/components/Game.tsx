import React, { useContext, useEffect, useState } from 'react'
import Grid from './Grid';
import './Game.css'
import DropDown from './DropDown/DropDown';
import { GameContext } from '../context/Context';

const Game = () => {
  const { gridState, setGridState, startSim,
    setStartSim, updateGrid, reset,
    setReset, setRows, setCols,
    currentlyAliveCells, currentlyDeadCells,
    generation, generationHistory,
  } = useContext(GameContext)

  const [dimensions, setDimensions] = useState(40)
  const [genInput, setGenInput] = useState<number>(0)

  const handleCellClick = ({ row, col }: { row: number; col: number }) => {
    const newGrid = [...gridState];
    newGrid[row][col] = !newGrid[row][col];
    setGridState(newGrid);
  }

  const handleStartClick = () => {
    setStartSim(!startSim);
    // if(!startSim) {
    //   setGenerationHistory((prevGeneration)=>prevGeneration.concat(gridState) )
    // }
  };

  const handleStopClick = () => {
    setStartSim(false);
  };

  const handleResize = () => {
    setRows(dimensions)
    setCols(dimensions)
  }

  const handleTimeTravel = () => {
     if (genInput >= generation) {
      setGridState(generationHistory[genInput])
    }
    else {
      alert("Generation "+genInput+" is out of bounds");
    }
  }

  return (
    <div className='game-container'>
      <div className='button-container'>

        {startSim && (
          <button className='stop-btn' onClick={handleStopClick}>Stop</button>
        )}
        {!startSim && (
          <>
            <button className='next-gen-btn' onClick={updateGrid}>Next Generation</button>
            <button className='start-btn' onClick={handleStartClick}>Start</button>
            <div className='row'>
              <input type="number" value={dimensions} onChange={(e) => setDimensions(parseInt(e.target.value))} />
              <button className='resize-btn' onClick={handleResize}>Resize</button>
              <input type="number" value={genInput} onChange={(e) => setGenInput(e.target.valueAsNumber)} placeholder='time travel'/>
              <button className='resize-btn' onClick={handleTimeTravel}>Go Back</button>
            </div>
          </>
        )}
        <div className='row'>
        <button className='reset-btn' onClick={() => { 
          setReset(!reset);
          setGenInput(0);
        }}>Reset</button>
          <DropDown />
          
        </div>   
      </div>
      <div className='row'><div>Born: {currentlyAliveCells}</div>
      <div>Dead: {currentlyDeadCells}</div>
      <div>Generation: {generation}</div>
      </div>
      <div>
        <Grid grid={gridState} onCellClick={handleCellClick} />
      </div>
    </div>
  )
}

export default Game