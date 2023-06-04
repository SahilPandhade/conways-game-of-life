import React, { useEffect, useState } from 'react'
import './Grid.css';
interface GridProps{
    grid:boolean[][];
    onCellClick:(position:{row:number,col:number})=>void
}
const Grid = ({grid,onCellClick}:GridProps) => {
    return (
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? 'alive' : 'dead'}`}
              onClick={() => onCellClick({row:rowIndex, col:colIndex})}
            />
            
          ))
        )}
      </div>
    );
}

export default Grid