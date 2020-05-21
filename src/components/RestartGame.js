import React from 'react'
import { connect } from 'react-redux'
import { restartGame } from '../redux/actions'

const RestartGame = ({ restartGame }) => {
    return (
        <button onClick={() => restartGame()}>
            Restart Game
        </button>
    )
}

export default connect(null, { restartGame })(RestartGame)