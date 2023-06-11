import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <div className="App-header">
       Conway's Game of Life
      </div>
      <Game rows={20} cols={20}/>
     
    </div>
  );
}

export default App;
