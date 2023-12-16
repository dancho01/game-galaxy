import './Home.css';
import React from 'react';

export default function TicTacToe () {

  const initialBoard = [ [ '', '', ''], 
                          [ '', '', ''],
                          [ '', '', ''], 
                        ];

  const[board, setBoard] = React.useState(initialBoard);
  const[turn, setTurn] = React.useState('X');
  const[winningTiles, setWinningTiles] = React.useState([]);
  const[winner, setWinner] = React.useState('');

  function changeTurns(y, x) {
    if (winner === '' && board[y][x] === '') {
      console.log(y)
      let newBoard = board;
      newBoard[y][x] = turn;
      console.log(turn);
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
      winCondition();
    }
  }

  function winCondition () {
    if (
      board[0][0] !== '' && board[0][0] ===  board[1][1] && board[1][1] === board[2][2]
    ) {
      setGameWinner([[0,0], [1,1], [2,2]], board[0][0]);
      return;
    }

    if (
      board[0][2] !== '' && board[0][2] ===  board[1][1] && board[1][1] === board[2][0]
    ) {
      setGameWinner([[0,2], [1,1], [2,0]], board[0][2]);
      return;
    }

    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] ===  board[i][1] && board[i][1] === board[i][2]) {
        setGameWinner([[i,0], [i,1], [i,2]], board[i][0]);
        return;
      }
      if (board[0][i] !== '' && board[0][i] ===  board[1][i] && board[1][i] === board[2][i]) {
        setGameWinner([[0, i], [1, i], [2, i]], board[0][i]);
        return;
      }
    }
  }

  function setGameWinner (tiles, winner) {
    setWinningTiles(tiles);
    setWinner(winner);
  }

  function checkTile (y, x) {
    let win = false;
    winningTiles.forEach(tile => {
      if (tile[0] === y && tile[1] === x) {
        win = true;
      }
    })
    return win ? 'winner' : ''
  }

  function resetGame() {
    setBoard(initialBoard);
    setWinner('');
    setWinningTiles([]);
    setTurn('X');
  }
  
  return (
    <div className='tic-parent'>
      {board.map((row, y) => {
        return (
          <div className='tic-row'>
            {row.map((val, x) => {
              return <button style={{height: 120, width: 120, fontSize: 25}} className={checkTile(y,x)} onClick={() => changeTurns(y,x)}>{val}</button>
            })}
          </div>
        );
      })} <br />
      {winner && <div style={{fontSize: 25, color: '#61dafb'}}>The winner is: {winner}</div> } <br />
      <button style={{width: 75}} onClick={() => resetGame()}>Reset</button>
    </div>
  )
 
}