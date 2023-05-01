import './Home.css';
import React from 'react';
import {strs} from './data/blanko.js';

function Blanko () {
  const initial = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [container, setContainer] = React.useState(initial);
  const [correctAnswer, setCorrectAnswer] = React.useState(initial);
  const [indices, setIndices] = React.useState([]);

  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const item = strs[randomIndex];
    return item;
  }

  function setNewString() {
    const rndStr = getRandomItem();
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

  React.useEffect(() => {
    setNewString();
  }, [])

  function updateContainer (value, index) {
    let newContainer = [...container];
    newContainer[index] = String(value);
    setContainer(newContainer);

    let match = true;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] !== newContainer[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      alert('Correct!');
      localStorage.setItem('games-won', parseInt(localStorage.getItem('games-won')) + 1);
      setNewString();
    }
  }


  return (
    <div className='parent'>
      <div className='flex'>
        {container.map((box, i) => {
          if (indices.includes(i)) {
            return (
              <input className='box' value={box} maxLength={1} onChange={e => updateContainer(e.target.value, i)} ></input>
            )
          }
          return (
            <div className='box'>{box}</div>
          )
        }
        )}
      </div> <br></br>
      <button onClick={setNewString} >RESET</button>
    </div>
  );
}

export default Blanko;