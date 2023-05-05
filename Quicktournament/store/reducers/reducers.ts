import { combineReducers } from "redux";
import playerReducer from "./playerSlice";
import gameReducer from "./gameSlice"

export const reducers = combineReducers({
    player: playerReducer,
    game: gameReducer
})