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
      <span className="blue-text" >Pick a game of your choice.</span> <br></br>
      <span className='score-text'>Games won: {localStorage.getItem('games-won')}</span> &nbsp;
      <button onClick={resetCounter} className='reset-button' >Reset Score</button>
    </div>
  );
}

export default Home;