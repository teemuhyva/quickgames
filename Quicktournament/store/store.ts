import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerSlice';
import gameReducer from './reducers/gameSlice'


export const store = configureStore({
    reducer: {
        player: playerReducer,
        game: gameReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;