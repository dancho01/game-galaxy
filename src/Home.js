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
      <span className="red-text" >Please choose an option from the navbar.</span> <br></br>
      <span>Games won: {localStorage.getItem('games-won')}</span> <span onClick={resetCounter} className='reset-button' >(reset)</span>
    </div>
  );
}

export default Home;