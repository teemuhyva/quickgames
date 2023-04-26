export class Player {
    id!: number;
    playerName!: string;
    gameType!: string;
    regTime: string;
    wins: number;
    onGoingGame: number;

    static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            gameType: "string",
            regTime: "string",
            wins: "int",
            onGoingGame: "int"
        },
        primaryKey: 'id',
    };
}