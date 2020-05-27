import React from "react"
import { connect } from 'react-redux'
import { guessLetter, startGame, setStatus } from "../redux/actions"
import { letters } from "../constants"

const Buttons = ({ guessLetter, startGame, status, setStatus }) => {

    const handleClick = (letter) => {
        guessLetter(letter)
    }

    const renderLetter = letter => {
        return (<button
            key={letter}
            onClick={() => [handleClick(letter), setStatus()]}
            disabled={status === "pending" || status === "winner!" || status === "you killed me, loser!"}
        >
            {letter}
        </button>)
    }

    return (
        <div>
            <button onClick={startGame}
                disabled={status === "player" || status === "winner!" || status === "you killed me, loser!"}
            >
                Start Game
            </button>
            <br />
            <br />
            {letters.map(letter => renderLetter(letter))}
        </div>
    )
}

const mapStateToProps = ({ status }) => ({ status })

export default connect(mapStateToProps, { guessLetter, startGame, setStatus })(Buttons)