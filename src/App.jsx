import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Slido from './Slido';
import TicTacToe from './TicTacToe';
import Guess from './Guess';
import CatFacts from './CatFacts';
import Navbar from './Navbar';


function App() {

  async function fetchValue () {
    try {
      localStorage.setItem('games-won', 0);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchValue();
  }, [])

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/game-galaxy" element={<Home fetchCall={fetchValue} />} />
          <Route path="/guess" element={<Guess />} />
          <Route path="/slido" element={<Slido/>} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path='/catfacts' element={<CatFacts />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
