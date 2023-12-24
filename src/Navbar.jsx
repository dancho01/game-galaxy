import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import './App.css';

function Navbar() {

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

  return (
    <nav>
        <h1 className="App-logo">
          <Link to="/game-galaxy" style={{color: "darkblue"}}>
          GameGalaxy 🪐
          </Link>          
        </h1>
 
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
        </>) : (<>
        <ul>
          <li>
            <Link to="/game-galaxy">H</Link>
          </li> |
          <li>
            <Link to="/tictactoe">T</Link>
          </li> |
          <li>
            <Link to="/guess">G</Link>
          </li> |
          <li>
            <Link to="/slido">S</Link>
          </li> |
          <li>
            <Link to="/catfacts">C</Link>
          </li>
        </ul>        
        </>)
      }
    </nav>
  );
};

export default Navbar;