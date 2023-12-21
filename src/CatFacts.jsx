import React from 'react';
import './CatFacts.css';
import { catFacts, catPics } from './data/cats'


function CatFacts() {

  const [catFact, setCatFact] = React.useState('waiting');
  const [picNumber, setPicNumber] = React.useState(0);
  const [buttonClicked, setButtonClicked] = React.useState(false)

  function handleClick() {

    if (!buttonClicked) setButtonClicked(true);

    const randIndex = Math.floor(Math.random() * catFacts.length);
    setCatFact(catFacts[randIndex])

    if (picNumber < 19) {
      setPicNumber(prev => prev + 1);
    } else {
      setPicNumber(0)
    }
}
  return (
    <div className='container'>
      <div className='img-container'>
        <img src={catPics[picNumber]} alt="" />
      </div>

      <button className='fact-button' onClick={handleClick}>
        {buttonClicked ? 'Next Fact' : 'Press to get a cool cat fact!'}
      </button>

      <h1 className='cat-fact'>{catFact}</h1>
    </div>
  )
}

export default CatFacts