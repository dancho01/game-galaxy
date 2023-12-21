import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import './App.css';

function Navbar() {
  return (
    <nav>
        <h1 className="App-logo">
          <Link to="/game-galaxy" style={{color: "darkblue"}}>
          GameGalaxy 🪐
          </Link>          
        </h1>
 
        <ul>
            <li>
            <Link to="/game-galaxy">Home</Link>
            </li>
            <li>
            <Link to="/tictactoe">TicTacToe</Link>
            </li>
            <li>
            <Link to="/guess">GuessTheCountry</Link>
            </li>
            <li>
            <Link to="/slido">Slider</Link>
            </li>
            <li>
            <Link to="/catfacts">CatFacts</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;