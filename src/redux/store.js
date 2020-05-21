import { configureStore } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"
import reducer from './reducer'
import { epicFetchWords } from "./epic"

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
    reducer,
    middleware: [epicMiddleware]
})

epicMiddleware.run(epicFetchWords)