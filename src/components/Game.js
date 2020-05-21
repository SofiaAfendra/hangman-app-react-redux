import React from "react"
import { connect } from "react-redux"

const Game = ({ wrongGuesses, format, guesses, status }) => {
    return (
        <div>
            <p>
                Wrong guesses: {wrongGuesses}
            </p>
            <p>
                And the word is: {format}
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