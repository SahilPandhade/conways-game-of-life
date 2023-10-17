import React, { useContext, useEffect, useRef, useState } from 'react'
import './Grid.css';
import { GameContext } from '../context/Context';
import { GridProps } from '../constants/Types';

const Grid = ({ grid, onCellClick }: GridProps) => {
  const { rows, cols } = useContext(GameContext)
  return (
    <div className="grid" 
    //ref={gridRef}
       style={{ gridTemplateRows:`repeat(${rows},1fr)`,gridTemplateColumns:`repeat(${cols},1fr)`}}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? 'alive' : 'dead'}`}
            onClick={() => onCellClick({ row: rowIndex, col: colIndex })}
          />

        ))
      )}
    </div>
  );
}

export default Grid