import { GUESS_LETTER, RESTART_GAME, FETCH_WORD, START_GAME } from "./actionTypes"

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