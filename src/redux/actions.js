import { GUESS_LETTER, RESTART_GAME, FETCH_WORD, START_GAME, GUESS_WRONGLY, GUESS_CORRECTLY, SHOW_GUESSES, CHANGE_STATUS } from "./actionTypes"

export const guessLetter = letter => ({
    type: GUESS_LETTER,
    payload: letter
})

export const restartGame = () => ({
    type: RESTART_GAME
})

export const fetchWord = (word) => ({
    type: FETCH_WORD,
    payload: word
})

export const startGame = () => ({
    type: START_GAME
})

export const guessWrongly = wrongTries => ({
    type: GUESS_WRONGLY,
    payload: wrongTries
})

export const guessCorrectly = correctLetter => ({
    type: GUESS_CORRECTLY,
    payload: correctLetter
})

export const showGuesses = guesses => ({
    type: SHOW_GUESSES,
    payload: guesses
})

export const changeStatus = playerStatus => ({
    type: CHANGE_STATUS,
    payload: playerStatus
})