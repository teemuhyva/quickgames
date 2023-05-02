export interface Game {
    _id: number;
    player1Id?: number;
    player1?: string;
    player1Score?: number;
    player2Id?: number;
    player2?: string;
    player2Score?: number;
    finished: number;
}

export interface NewPlayer {
    id: number;
    playerName: string;
    gameType: string;
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
    games: Game[],
    game: Game
}

const AddPlayer: string = "addplayer"
const UpdateGame: string = "updategame"
export { AddPlayer }
export { UpdateGame }