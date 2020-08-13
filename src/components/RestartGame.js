import React from 'react'
import { connect } from 'react-redux'
import { restartGame } from '../redux/actions'

const RestartGame = ({ restartGame, status }) => {
    return (
        <div className='restartButtonContainer'>
            <button className='restartButton'
                onClick={() => restartGame()} disabled={status === "pending..."}>
                Restart
        </button>
        </div>
    )
}

const mapStateToProps = ({ status }) => ({ status })
export default connect(mapStateToProps, { restartGame })(RestartGame)