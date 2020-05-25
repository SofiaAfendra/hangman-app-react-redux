import { configureStore } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"
import reducer from './reducer'
import rootEpic from "./epic"

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
    reducer,
    middleware: [epicMiddleware]
})

epicMiddleware.run(rootEpic)