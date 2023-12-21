import './Home.css';
import React from 'react';
import {strs} from './data/countryList.js';

function Guess () {
  const initial = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [container, setContainer] = React.useState(initial);
  const [correctAnswer, setCorrectAnswer] = React.useState(initial);
  const [indices, setIndices] = React.useState([]);

  // get random str
  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const item = strs[randomIndex];
    return item;
  }

  // randomly choose nonspace characters and replace with input fields
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

  // when page first loads, must find random string
  React.useEffect(() => {
    setNewString();
  }, [])

  // update the list whenever the inputfields are changed and check if correct
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
      </div> <br />
      <button onClick={setNewString} style={{fontSize: 20}} >Reset</button>
    </div>
  );
}

export default Guess;