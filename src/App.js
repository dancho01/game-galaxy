import './App.css';
import logo from './assets/logo.png';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home';
import Slido from './Slido';
import Tetro from './Tetro';
import Blanko from './Blanko';


function App() {

  const [viewport, setViewport] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setViewport(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  async function fetchValue () {
    try {
      const res = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json');
      const data = await res.json();
      console.log(data.score);
      localStorage.setItem('games-won', data.score);
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
          <img src={logo} className="App-logo" alt="logo" />
          <span className='navigation'>
            {viewport > 800 ? ( <> 
            <Link to="/">Home</Link>&nbsp;|&nbsp;
            <Link to="/blanko">Blanko</Link>&nbsp;|&nbsp;
            <Link to="/slido">Slido</Link>&nbsp;|&nbsp;
            <Link to="/tetro">Tetro</Link>
            </> ) : (<>
            <Link to="/">H</Link>&nbsp;|&nbsp;
            <Link to="/blanko">B</Link>&nbsp;|&nbsp;
            <Link to="/slido">S</Link>&nbsp;|&nbsp;
            <Link to="/tetro">T</Link>
            </>)
            }
          </span>
        </header>
        <div className='main-body'>
          <Routes>
            <Route path="/" element={<Home fetchCall={fetchValue} />} />
            <Route path="/blanko" element={<Blanko />} />
            <Route path="/slido" element={<Slido/>} />
            <Route path="/tetro" element={<Tetro />} />
          </Routes>
        </div>
      </BrowserRouter>
      
      <footer className='App-footer'></footer>

    </div>
  );
}

export default App;
