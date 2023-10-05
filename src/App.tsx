import React from 'react';
import './App.css';
import Game from './components/Game';
import { GameProvider } from './context/Context';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <div className="App-header">
          Conway's Game of Life
        </div>
        <Game />
      </div>
    </GameProvider>
  );
}

export default App;
