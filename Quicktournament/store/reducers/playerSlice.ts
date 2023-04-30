import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddPlayer } from '../../src/interfaces/interfaces';
import { NewPlayer, Players } from './../../src/interfaces/interfaces';

const initialState: Players = {
    players: [],
}

export const playersSlice = createSlice({
    name: AddPlayer,
    initialState: initialState,
    reducers: {
        add: (state: Players, action: PayloadAction<NewPlayer>) => {
            state.players.push(action.payload);       
        },
        updatePlayer: (state: Players, action: PayloadAction<NewPlayer>) => {

        },
        generateWaitingList: (state, action: PayloadAction<NewPlayer[]>) => {
            action.payload.map(p => {
                state.players.push(p);
            })
        },
        removePlayerFromWaitinList: (state, action: PayloadAction<NewPlayer>) => {
            state.players = state.players.filter(p => p.id !== action.payload.id);
        },
        purgeall: (state) => {
            state.players = [];
        }
    }
})

export const { add, updatePlayer, generateWaitingList, purgeall, removePlayerFromWaitinList } = playersSlice.actions;
export default playersSlice.reducer;