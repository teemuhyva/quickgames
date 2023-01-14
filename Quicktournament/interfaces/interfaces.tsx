export interface CurrentGame {
    id: number;
    player1: string;
    player2: string;
    finished: boolean;
}

export interface Game {
    id: string;
    player1: string;
    player2: string;
    win: string
}

export interface NewPlayer {
    id: number;
    playerName: string;
    gameType: string;
    regTime: string
    wins: number;
}

export type GameType = 'billiard' | 'snooker' | undefined;