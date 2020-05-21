import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Buttons from './components/Buttons'
import Game from './components/Game'
import { store } from './redux/store'
import RestartGame from './components/RestartGame';

ReactDOM.render(
    <Provider store={store}>
        <Game />
        <Buttons />
        <br />
        <RestartGame />
    </Provider>,
    document.getElementById('root')
);