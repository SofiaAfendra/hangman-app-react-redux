import { RESTART_GAME, FETCH_WORD, GUESS_WRONGLY, GUESS_CORRECTLY, SHOW_GUESSES, CHANGE_STATUS } from './actionTypes'

const initialState = {
    word: '',
    guesses: [],
    wrongGuesses: 0,
    status: "pending"
}

initialState.format = Array(initialState.word.length).fill("_").join(" ")

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case FETCH_WORD:
            return ({
                ...state,
                word: payload,
                format: Array(payload.length).fill("_").join(" "),
                status: "player"
            })

        case GUESS_WRONGLY:
            return ({
                ...state,
                wrongGuesses: payload
            })

        case GUESS_CORRECTLY:
            return ({
                ...state,
                format: payload
            })

        case SHOW_GUESSES:
            return ({
                ...state,
                guesses: payload
            })

        case CHANGE_STATUS:
            return ({
                ...state,
                status: payload
            })

        case RESTART_GAME:
            return ({ ...initialState })

        default:
            return state
    }
}