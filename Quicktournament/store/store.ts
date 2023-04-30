import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerSlice';


export const store = configureStore({
    reducer: {
        player: playerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;