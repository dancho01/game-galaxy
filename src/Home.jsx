import './Home.css';
import React from 'react';

function Home ({ fetchCall }) {

  const [update, setUpdate] = React.useState(false);

  async function resetCounter () {
    await fetchCall();
    setUpdate(!update);
  }

  return (
    <div className='body-text'>
      <span className="blue-text" >Pick a game of your choice.</span> <br></br> <br />
      <span className='score-text'>Games won: {localStorage.getItem('games-won')}</span> <br /> <br />
      <button className='reset-button' onClick={resetCounter} >Reset Score</button>
    </div>
  );
}

export default Home;