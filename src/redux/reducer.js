import { RESTART_GAME, FETCH_WORD, GUESS_WRONGLY, SHOW_GUESSES, CHANGE_STATUS, CHANGE_FORMAT } from './actionTypes'

const initialState = {
    word: '',
    guesses: [],
    wrongGuesses: 0,
    status: "pending..."
}

initialState.format = Array(initialState.word.length).fill("_").join(" ")

export default (state = initialState, { type, payload }) => {
    const { wrongGuesses } = state

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
                wrongGuesses: wrongGuesses + 1
            })

        case CHANGE_FORMAT:
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