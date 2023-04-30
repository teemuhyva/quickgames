import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Game, Games, UpdateGame } from './../../src/interfaces/interfaces';

const initialState: Games = {
    games: []
}

export const gameSlice = createSlice({
    name: UpdateGame,
    initialState: initialState,
    reducers: {
        addGamePlayed: (state: Games, action: PayloadAction<Game>) => {
            state.games.push(action.payload);
        },
        generateEndedGamesList: (state, action: PayloadAction<Game[]>) => {
            action.payload.map(p => {
                state.games.push(p);
            })
        }
    }
})

export const { addGamePlayed, generateEndedGamesList } = gameSlice.actions;
export default gameSlice.reducer;