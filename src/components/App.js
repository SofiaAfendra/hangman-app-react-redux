import React from 'react';
import Buttons from './Buttons'
import Game from './Game'
import RestartGame from './RestartGame';

const App = () =>
    <div className='gameContainer'>
        <Game />
        <Buttons />
        <RestartGame />
    </div>

export default App