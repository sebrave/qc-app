import React from 'react';
import logo from './logo.svg';
import './App.css';
import GifScreen from './components/gifScreen.js';

function App() {
  return (
    <div className="App">
      <h1>Quick GIF</h1>
      <GifScreen />
    </div>
  );
}

export default App;
