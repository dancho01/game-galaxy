import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home';
import Slido from './Slido';
import TicTacToe from './TicTacToe';
import Guess from './Guess';


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
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          <h1 className="App-logo">GameGalaxy</h1>
          <span className="logo">🪐</span>
          <span className='navigation'>
            {viewport > 800 ? ( <> 
            <Link to="/">Home</Link>&nbsp;|&nbsp;
            <Link to="/tictactoe">TicTacToe</Link>&nbsp;|&nbsp;
            <Link to="/guess">GuessTheCountry</Link>&nbsp;|&nbsp;
            <Link to="/slido">Slider</Link>
            </> ) : (<>
            <Link to="/">H</Link>&nbsp;|&nbsp;
            <Link to="/tictactoe">T</Link>&nbsp;|&nbsp;
            <Link to="/guess">G</Link>&nbsp;|&nbsp;
            <Link to="/slido">S</Link>
            </>)
            }
          </span>
        </header>
        <div className='main-body'>
          <Routes>
            <Route path="/" element={<Home fetchCall={fetchValue} />} />
            <Route path="/guess" element={<Guess />} />
            <Route path="/slido" element={<Slido/>} />
            <Route path="/tictactoe" element={<TicTacToe />} />
          </Routes>
        </div>
      </BrowserRouter>
      <footer className='App-footer'></footer>
    </div>
  );
}

export default App;
