import React from "react"
import { connect } from "react-redux"
import './app.css'

const Game = ({ wrongGuesses, format, guesses, status }) => {
    return (
        <div className='gameStatusContainer'>
            <p>
                Wrong guesses: {wrongGuesses}
            </p>
            <p>
                The deadly word: {format}
            </p>
            <p>
                Your guesses: {guesses}
            </p>
            <p>
                Your status: {status}
            </p>
        </div>
    )
}

const mapStateToProps = ({ wrongGuesses, format, guesses, status }) => ({
    wrongGuesses,
    format,
    guesses,
    status
})

export default connect(mapStateToProps)(Game)