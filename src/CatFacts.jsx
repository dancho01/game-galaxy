import React from 'react';
import './CatFacts.css';
import { catFacts, catPics, catQuestions,answerOptions , answers} from './data/cats'


function CatFacts() {

  const [catFact, setCatFact] = React.useState('waiting...');
  const [picNumber, setPicNumber] = React.useState(0);
  const [buttonClicked, setButtonClicked] = React.useState(false)
  const [quiz, setQuiz] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [attempted, hasAttempted] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [points, setPoints] = React.useState(0);
  const [correct, setCorrect] = React.useState(false);

  function handleClick() {
    if (!buttonClicked) setButtonClicked(true);
    if (picNumber <= 5) {
      setPicNumber(prev => prev + 1);
      setCatFact(catFacts[picNumber]);
    } else {
      setQuiz(true);
    }
  }

  function nextQuestion() {
    if (questionNumber <= 4) {
      setQuestionNumber(prev => prev + 1);
    }
    hasAttempted(false);
    setSelected(''); 
    setCorrect(false);
  }

  function submit() {
    if (selected === answers[questionNumber]) {
      setCorrect(true);
      setPoints(prev => prev + 1);
    } 
    hasAttempted(true);
    if (selected === '') {
      hasAttempted(false);
    }
  }

  const changeOption = e=> { 
    setSelected(e.target.value);
  }

  function tryAgain() {
    setCatFact('waiting...');
    setPicNumber(0);
    setButtonClicked(false);
    setQuiz(false);
    setQuestionNumber(0);
    hasAttempted(false);
    setSelected('');
    setPoints(0);
  }

  return (
    <div className='container'>

      {(quiz && questionNumber < 5) ?
      <>
      <div className='cat-fact' style={{marginTop: '75px'}}>Q{questionNumber + 1}. {catQuestions[questionNumber]} </div>
      <div className='cat-fact' style={{textAlign: 'left'}}>
        <p>Please select your answer:</p>
        <input disabled={attempted} type="radio" id="answer1" name={questionNumber} value={answerOptions[questionNumber][0]} onChange={changeOption} />
        <label for="answer1"> {answerOptions[questionNumber][0]}</label> <br />

        <input disabled={attempted} type="radio" id="answer2" name={questionNumber} value={answerOptions[questionNumber][1]} onChange={changeOption} />
        <label for="answer2"> {answerOptions[questionNumber][1]}</label> <br /> 

        <input disabled={attempted} type="radio" id="answer3" name={questionNumber} value={answerOptions[questionNumber][2]} onChange={changeOption} />
        <label for="answer3"> {answerOptions[questionNumber][2]}</label> <br />

        <input disabled={attempted} type="radio" id="answer4" name={questionNumber} value={answerOptions[questionNumber][3]} onChange={changeOption} />
        <label for="answer4"> {answerOptions[questionNumber][3]}</label> <br />
      </div>
      {correct ? <div className='cat-fact' style={{color: '#32de84'}}>Correct!</div> : (!correct && attempted && selected) ? <div className='cat-fact' style={{color: '#fd5c63'}}>Incorrect!</div> : (!selected && !attempted) ? <div className='cat-fact' style={{color: '#fd5c63'}}>Select an answer!</div>  : <></>}
        <button disabled={attempted} className='fact-button' onClick={submit}>Submit</button>
        <button disabled={!attempted} className='fact-button' onClick={nextQuestion}>Next</button>
      </> : (quiz && questionNumber >= 4) ? <>
        <div className='img-container'>
          <img src={catPics[picNumber]} alt="" />
        </div>
        <div className='cat-fact'>Score: {points} / 5</div>
        <button className='fact-button' onClick={tryAgain}>Try Again</button>
      </> :
        <>
        {(picNumber <= 5 && picNumber > 0) ? <div style={{color:'lightcoral'}} className='cat-fact'>Fact {picNumber}</div> : 
        picNumber === 0 ? <div style={{color:'lightcoral'}} className='cat-fact'>Cat Facts</div> : <>
        <div style={{color:'lightcoral'}} className='cat-fact'>Time to start Quiz</div></>}

        <div className='img-container'>
          <img src={catPics[picNumber]} alt="" />
        </div>
        <button className='fact-button' onClick={handleClick}>
        {(buttonClicked && picNumber <= 5) ? 'Next Fact' : (buttonClicked && picNumber === 6) ? 'Start quiz' : 'Press to get a cool cat fact!'}
        </button>
        <h1 className='cat-fact'>{catFact}</h1> 
        </>
      }
    </div>
  )
}

export default CatFacts