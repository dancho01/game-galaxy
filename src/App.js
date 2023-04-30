import './App.css';
import React from 'react';

function App() {

  const initial = [['', '', ''], ['', '', ''], ['', '', '']];
  const [board, setBoard] = React.useState(initial);
  const [turn, setTurn] = React.useState('X');
  const [winningTiles, setWinningTiles] = React.useState([]);
  const [winner, setWinner] = React.useState('');


  function checkWinCondition () {
    if (board[0][0] !== '' && board[1][1] === board[0][0] && board[2][2] === board[1][1]) {
      setWinningTiles([[0, 0], [1, 1], [2, 2]]);
      setWinner(board[0][0]);
      let winCount = localStorage.getItem(`${board[0][0]}`);
      localStorage.setItem(
        `${board[0][0]}`, winCount ? parseInt(winCount) + 1 : 1
      );
      return;
    }
    if (board[0][2] !== '' && board[1][1] === board[0][2] && board[2][0] === board[1][1]) {
      setWinningTiles([[0, 2], [1, 1], [2, 0]]);
      setWinner(board[0][2]);
      let winCount = localStorage.getItem(`${board[0][2]}`);
      localStorage.setItem(
        `${board[0][2]}`, winCount ? parseInt(winCount) + 1 : 1
      );
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][1] === board[i][0] && board[i][2] === board[i][1]) {
        setWinningTiles([[i, 0], [i, 1], [i, 2]]);
        setWinner(board[i][0]);
        let winCount = localStorage.getItem(`${board[i][0]}`);
        localStorage.setItem(
          `${board[i][0]}`, winCount ? parseInt(winCount) + 1 : 1
        );
        return;
      }
      if (board[0][i] !== '' && board[1][i] === board[0][i] && board[2][i] === board[1][i]) {
        setWinningTiles([[0, i], [1, i], [2, i]]);
        setWinner(board[0][i]);
        let winCount = localStorage.getItem(`${board[0][i]}`);
        localStorage.setItem(
          `${board[0][i]}`, winCount ? parseInt(winCount) + 1 : 1
        );
        return;
      }
    }
  }

  function changeTile (y, x) {
    let newBoard = [...board];
    if (newBoard[y][x] === '' && !winner) {
      newBoard[y][x] = turn;
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
      checkWinCondition();
    }
  }

  function checkValue (y, x) {
    let win = false;
    winningTiles.forEach(tile => {
      if (tile[0] === y && tile[1] === x) {
        win = true;
      }
    })
    return win ? 'green' : ''
  }

  return (
    <div className='parent'>
      {board.map((col, y) => (
        <div className='row'> 
          {col.map((row, x)  => (
            <button onClick={() => changeTile(y, x)} className={checkValue(y, x)}> 
              {row}
            </button>
          )
          )}
        </div>
      )
      )}
      {winner && <div> 
        <div>The winner is {winner}</div>
        <div> {winner} has won {localStorage.getItem(`${winner}`)} times</div>
      </div>
      }
    </div>
  );
}

export default App;
