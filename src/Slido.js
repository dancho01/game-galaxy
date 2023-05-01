import './Home.css';
import React from 'react';
import shrek1 from './data/shrek/1.png';
import shrek2 from './data/shrek/2.png';
import shrek3 from './data/shrek/3.png';
import shrek4 from './data/shrek/4.png';
import shrek5 from './data/shrek/5.png';
import shrek6 from './data/shrek/6.png';
import shrek7 from './data/shrek/7.png';
import shrek8 from './data/shrek/8.png';

export default function Slido () {

  const initial = [['', '', ''], ['', '', ''], ['', '', '']];
  const winState = [[1, 2, 3], [4, 5, 6], [7, 8, '']];
  const [board, setBoard] = React.useState(initial);
  const [solved, setSolved] = React.useState(false);
  const [hasMoved, setHasMoved] = React.useState(false);

  // randomise the squares
  function randomiseSquares () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, ''];

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    console.log(numbers);

    let newBoard = [...board];

    let num = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newBoard[i][j] = numbers[num];
        num++;
      }
    }
    setBoard(newBoard);
    setSolved(false);
    setHasMoved(false);
  }

  React.useEffect(() => {
    randomiseSquares();
  }, []);

  // depending on the value, returns corresponding shrek image
  function returnImage (row) {
    switch (row) {
      case 1:
        return shrek1;
      case 2:
        return shrek2;
      case 3:
        return shrek3;
      case 4:
        return shrek4;
      case 5:
        return shrek5;
      case 6:
        return shrek6;
      case 7:
        return shrek7;
      case 8:
        return shrek8;
    }
  }

  // checks win condition and if so, restart the game
  function checkWinCondition (newBoard) {
    setHasMoved(true);
    let match = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (winState[i][j] !== newBoard[i][j]) {
          match = false;
          break;
        }
      }
    }
    if (match) {
      alert('Correct!');
      localStorage.setItem('games-won', parseInt(localStorage.getItem('games-won')) + 1);
      randomiseSquares();
    }
  }

  // moves the tiles
  function move (y, x) {
    let newBoard = [...board];
    if (y - 1 >= 0 && newBoard[y - 1][x] === '') {
      newBoard[y - 1][x] = newBoard[y][x];
      newBoard[y][x] = '';
      setBoard(newBoard);
      checkWinCondition(newBoard);
      return;
    }
    // check down
    if (y + 1 <= 2 && newBoard[y + 1][x] === '') {
      newBoard[y + 1][x] = newBoard[y][x];
      newBoard[y][x] = '';
      setBoard(newBoard);
      checkWinCondition(newBoard);
      return;
    }
 
    // check left
    if (x - 1 >= 0 && newBoard[y][x - 1] === '') {
      newBoard[y][x - 1] = newBoard[y][x];
      newBoard[y][x] = '';
      setBoard(newBoard);
      checkWinCondition(newBoard);
      return;
    }
    
    if (x + 1 <= 2 && newBoard[y][x + 1] === '') {
      newBoard[y][x + 1] = newBoard[y][x];
      newBoard[y][x] = '';
      setBoard(newBoard);
      checkWinCondition(newBoard);
      return;
    }
  }

  function moveToSolvedState () {
    setHasMoved(true);
    setBoard(winState);
    setSolved(true);
  }

  // for key pressing
  function handleKeyPress (event) {
    console.log(event.key);
    let x = 0;
    let y = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          x = i;
          y = j;
        }
      }
    }
    let newBoard = [...board];
    switch (event.key) {
      case "ArrowDown": 
        if (x - 1 >= 0) {
          newBoard[x][y] = newBoard[x - 1][y];
          newBoard[x - 1][y] = '';
          setBoard(newBoard);
          checkWinCondition(newBoard);
        }
        break;
      case "ArrowUp":
        if (x + 1 <= 2) {
          newBoard[x][y] = newBoard[x + 1][y];
          newBoard[x + 1][y] = '';
          setBoard(newBoard);
          checkWinCondition(newBoard);
        }
        break;
      case "ArrowRight": 
        if (y - 1 >= 0) {
          newBoard[x][y] = newBoard[x][y - 1];
          newBoard[x][y - 1] = '';
          setBoard(newBoard);
          checkWinCondition(newBoard);
        }
        break;
      case "ArrowLeft": 
        if (y + 1 <= 2) {
          newBoard[x][y] = newBoard[x][y + 1];
          newBoard[x][y + 1] = '';
          setBoard(newBoard);
          checkWinCondition(newBoard);
        }
        break;
    }
  }

  return <>
    <div className='shrek-flex' onKeyDown={handleKeyPress} tabIndex="0">
    {board.map((col, y) => (
      <div className='shrek-row'> 
        {col.map((row, x)  => (
          <div className='shrek-img' >
            {row  && <img src={returnImage(row)} alt="shrek_img" onClick={() => move(y, x)} /> }
          </div>
        )
        )}
      </div>
    )
    )} 
    </div>
    <br></br>
    <div className='buttons'>
      <button onClick={moveToSolvedState} disabled={solved} >Solve</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={randomiseSquares} disabled={!hasMoved} >Reset</button>
    </div>
  </>
}