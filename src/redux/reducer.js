import { GUESS_LETTER, RESTART_GAME, FETCH_WORD } from './actionTypes'

const initialState = {
    word: '',
    guesses: [],
    wrongGuesses: 0,
    status: "player"
}

initialState.format = Array(initialState.word.length).fill("_").join(" ")

export default (state = initialState, { type, payload }) => {

    const { word, guesses } = state

    const wrongGuessCounter = (word, guesses) => {
        let wrongGuess = []
        guesses.map(guess => word.indexOf(guess) === -1 ? wrongGuess.push(guess) : wrongGuess)
        return wrongGuess.length
    }

    const correctGuess = (word, guesses) => {
        let guessed = []
        const wordLetters = word.split("")
        wordLetters.map(letter => guesses.indexOf(letter) !== -1 ? guessed.push(letter) : guessed.push('_'))
        return guessed.join(" ")
    }

    const isWinner = (word, guesses) => {
        const countFails = wrongGuessCounter(word, guesses)
        const rightGuesses = correctGuess(word, guesses)
        const newWord = word.split("").join(" ")
        return countFails < 6 && rightGuesses === newWord ? "winner!"
            : countFails < 6 ? "player"
                : "you killed me, loser!"
    }

    switch (type) {
        case GUESS_LETTER:
            let newGuesses = [...guesses, payload]
            let newWrongGuessCounter = wrongGuessCounter(word, newGuesses)
            let newCorrectGuess = correctGuess(word, newGuesses)
            return ({
                word,
                format: newCorrectGuess,
                guesses: newGuesses,
                wrongGuesses: newWrongGuessCounter,
                status: isWinner(word, newGuesses)
            })

        case FETCH_WORD:
            return ({
                ...state,
                word: payload,
                format: Array(payload.length).fill("_").join(" ")
            })

        case RESTART_GAME:
            return ({ ...initialState })

        default:
            return state
    }
}