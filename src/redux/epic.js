import { ofType, combineEpics } from "redux-observable"
import { mergeMap, map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { fetchWord, guessWrongly, showGuesses, changeStatus, changeFormat, guessCorrectly } from "./actions"
import { START_GAME, GUESS_LETTER, GUESS_CORRECTLY } from "./actionTypes"

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
        mergeMap(({ payload }) => {
            const { word, guesses } = state$.value
            if (!word.includes(payload)) {
                return [guessWrongly(), showGuesses([...guesses, payload])]
            }
            return [guessCorrectly(payload), showGuesses([...guesses, payload])]
        }
        )
    )

const guessCorrectlyEpic = (action$, state$) =>
    action$.pipe(
        ofType(GUESS_CORRECTLY),
        map(({ payload }) => {
            const { word, guesses } = state$.value
            const correctGuess = (word, guesses) => {
                let guessed = []
                const wordLetters = word.split("")
                wordLetters.map(letter => guesses.indexOf(letter) !== -1 ? guessed.push(letter) : guessed.push('_'))
                return guessed.join(" ")
            }
            let newGuesses = [...guesses, payload]
            return changeFormat(correctGuess(word, newGuesses))
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
    changeStatusEpic
)