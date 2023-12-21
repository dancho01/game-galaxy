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

  const [viewport, setViewport] = React.useState(window.innerWidth);

  // window resizing
  React.useEffect(() => {
    function handleResize() {
      setViewport(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // fetch call
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
       {/*
          <header className='App-header'>
          <h1 className="App-logo">GameGalaxy</h1>
          <span className="logo">🪐</span>
          <span className='navigation'>
            {viewport > 800 ? ( <> 
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
            </> ) : (<>
            <Link to="/game-galaxy">H</Link>&nbsp;|&nbsp;
            <Link to="/tictactoe">T</Link>&nbsp;|&nbsp;
            <Link to="/guess">G</Link>&nbsp;|&nbsp;
            <Link to="/slido">S</Link>&nbsp;|&nbsp;
            <Link to="/catfacts">C</Link>
            </>)
            }
          </span>
        </header>
       */}
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
