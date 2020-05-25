import { ofType, combineEpics } from "redux-observable"
import { mergeMap, map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { fetchWord, guessWrongly, guessCorrectly, showGuesses, changeStatus } from "./actions"
import { START_GAME, GUESS_LETTER } from "./actionTypes"

const fetchWordEpic = action$ =>
    action$.pipe(
        ofType(START_GAME),
        mergeMap(() => ajax
            .getJSON("https://random-word-api.herokuapp.com/word?number=10")
            .pipe(map(response => fetchWord(response[Math.floor(Math.random() * 10)])))
        )
    )

const guessWronglyEpic = (action$, state$) =>
    action$.pipe(
        ofType(GUESS_LETTER),
        map(({ payload }) => {
            const { word, guesses } = state$.value
            const wrongGuessCounter = (word, guesses) => {
                let wrongGuess = []
                guesses.map(guess => word.indexOf(guess) === -1 ? wrongGuess.push(guess) : wrongGuess)
                return wrongGuess.length
            }
            let newGuesses = [...guesses, payload]
            return guessWrongly(wrongGuessCounter(word, newGuesses))
        })
    )

const guessCorrectlyEpic = (action$, state$) =>
    action$.pipe(
        ofType(GUESS_LETTER),
        map(({ payload }) => {
            const { word, guesses } = state$.value
            const correctGuess = (word, guesses) => {
                let guessed = []
                const wordLetters = word.split("")
                wordLetters.map(letter => guesses.indexOf(letter) !== -1 ? guessed.push(letter) : guessed.push('_'))
                return guessed.join(" ")
            }
            let newGuesses = [...guesses, payload]
            return guessCorrectly(correctGuess(word, newGuesses))
        })
    )

const showGuessesEpic = (action$, state$) =>
    action$.pipe(
        ofType(GUESS_LETTER),
        map(({ payload }) => {
            const { guesses } = state$.value
            return showGuesses([...guesses, payload])
        })
    )

const changeStatusEpic = (action$, state$) =>
    action$.pipe(
        ofType(GUESS_LETTER),
        map(() => {
            const { word, format, wrongGuesses } = state$.value
            const isWinner = (word, format, wrongGuesses) => {
                const newWord = word.split("").join(" ")
                return wrongGuesses < 6 && format === newWord ? "winner!"
                    : wrongGuesses < 6 ? "player"
                        : "you killed me, loser!"
            }
            return changeStatus(isWinner(word, format, wrongGuesses))
        })
    )

export default combineEpics(
    fetchWordEpic,
    guessWronglyEpic,
    guessCorrectlyEpic,
    showGuessesEpic,
    changeStatusEpic
)