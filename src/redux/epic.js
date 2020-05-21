import { ofType } from "redux-observable";
import { START_GAME } from "./actionTypes";
import { mergeMap, map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { fetchWord } from "./actions";

export const epicFetchWords = action$ =>
    action$.pipe(
        ofType(START_GAME),
        mergeMap(() => ajax
            .getJSON("https://random-word-api.herokuapp.com/word?number=10")
            .pipe(map(response => fetchWord(response[Math.floor(Math.random() * 10)])))
        )
    )