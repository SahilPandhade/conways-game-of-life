import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';
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
