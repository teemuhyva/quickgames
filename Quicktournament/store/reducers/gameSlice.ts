import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Game, Games, UpdateGame } from './../../src/interfaces/interfaces';

const initialState: Games = {
    games: [],
    game: {
        _id: 0,
        gameType: "",
        player1: "",
        player1Score: 0,
        player2: "",
        player2Score: 0,
        finished: 0
    }
}

export const gameSlice = createSlice({
    name: UpdateGame,
    initialState: initialState,
    reducers: {
        addGamePlayed: (state: Games, action: PayloadAction<Game>) => {
            state.games.push(action.payload);
        },
        updateGame: (state: Games, action: PayloadAction<Game>) => {
            const updatedGame = state.games.map(game => {
                if(game._id === action.payload._id) {
                    return { ...game, ...action.payload}
                } else {
                    return game;
                }
            })

            return {
                ...state,
                games: updatedGame
            };       
        },
        generateEndedGamesList: (state, action: PayloadAction<Game[]>) => {
            action.payload.map(p => {
                state.games.push(p);
            })
        }
    }
})

export const { addGamePlayed, updateGame, generateEndedGamesList } = gameSlice.actions;
export default gameSlice.reducer;