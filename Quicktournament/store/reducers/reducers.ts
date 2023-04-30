import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";

export const reducers = combineReducers({
    player: playerReducer
})