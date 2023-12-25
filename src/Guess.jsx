import './Home.css';
import React from 'react';
import {strs} from './data/countryList.js';

function Guess () {
  const initial = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const[container, setContainer] = React.useState(initial);
  const[correctAnswer, setCorrectAnswer] = React.useState(initial);
  const[indices, setIndices] = React.useState([]);
  const[num, setNum] = React.useState(0);
  const[correct, setCorrect] = React.useState(false);
  const[attemped, hasAttempted] = React.useState(false);

  // get random str
  function getRandomItem() {
    //const randomIndex = Math.floor(Math.random() * strs.length);
    const item = strs[num];
    setNum(num+1);
    if (num >= strs.length) {
      return null;
    }
    return item;
  }

  // randomly choose nonspace characters and replace with input fields
  function setNewString() {
    const rndStr = getRandomItem();
    if (rndStr === null) {
      console.log(num)
      return;
    }

    const answer = [...rndStr];
    const str = [...rndStr];
    const ind = [];
    console.log(str);

    for (let i = 0; i < 3; i++) {
      while (true) {
        let index = Math.floor(Math.random() * str.length);
        if (str[index] !== '' && str[index] !== ' ') {
          str[index] = '';
          ind.push(index);
          break;
        }
      }
    }
    setIndices(ind);
    setCorrectAnswer(answer);
    setContainer(str);
  }

  // when page first loads, must find random string
  React.useEffect(() => {
    setNewString();
  }, [])

  // update the list whenever the inputfields are changed and check if correct
  function updateContainer (value, index) {
    let newContainer = [...container];
    newContainer[index] = String(value);
    setContainer(newContainer);
  }

  function resetGame() {
    const item = strs[0];
    setNum(1);
    const answer = [...item];
    const str = [...item];
    const ind = [];
    for (let i = 0; i < 3; i++) {
      while (true) {
        let index = Math.floor(Math.random() * str.length);
        if (str[index] !== '' && str[index] !== ' ') {
          str[index] = '';
          ind.push(index);
          break;
        }
      }
    }
    setIndices(ind);
    setCorrectAnswer(answer);
    setContainer(str);
  }

  function checkAnswer() {
    hasAttempted(true);
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] !== container[i]) {
        return;
      }
    }
    localStorage.setItem('games-won', parseInt(localStorage.getItem('games-won')) + 1);
    setCorrect(true);
  }

  function nextWord() {
    hasAttempted(false);
    setCorrect(false);
    setNewString();
  }


  return (
    <div className='parent'>
      <div className='flex'>
        {container.map((box, i) => {
          if (indices.includes(i)) {
            return (
              <input disabled={correct} className='box' placeholder='...' value={box} maxLength={1} onChange={e => updateContainer(e.target.value, i)} ></input>
            )
          }
          return (
            <div className='box'>{box}</div>
          )
        }
        )}
      </div> <br />

      
      {(attemped && correct) ? <div style={{fontSize: 25, color: '#32de84'}} >Correct!</div> : (attemped && !correct) ? <div style={{fontSize: 25, color: '#fd5c63'}}>Incorrect! Try Again</div> : <></> };

      {num > 7 ? <>
        <div style={{fontSize: 25, color: '#61dafb'}}>Congratulations!</div> 
        <br />
        <button onClick={resetGame} className='reset-button'>Reset Game</button>
      </> : <> <br />
        <button onClick={checkAnswer} disabled={correct} className='reset-button'>Check</button> <br />
        <br /> <button onClick={nextWord} disabled={!correct} className='reset-button'>Next</button>
      </>}
    </div>
  );
}

export default Guess;