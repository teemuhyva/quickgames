export interface Game {
    _id: number;
    player1?: string;
    player1Score?: number;
    player2?: string;
    player2Score?: number;
}

export interface NewPlayer {
    id: number;
    playerName: string;
    gameType: GameType;
    regTime: string
    wins: number;
    lost: number;
    onGoingGame: number;
    hasThreeWins: number;
}

export interface Players {
    players: NewPlayer[]
}

export interface Games {
    games: Game[]
}

export type GameType = 'billiard' | 'snooker' | undefined;

const AddPlayer: string = "addplayer"
const UpdateGame: string = "updategame"
export { AddPlayer }
export { UpdateGame }