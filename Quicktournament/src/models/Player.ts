export class Player {
    id!: number;
    playerName!: string;
    gameType!: string;
    regTime: string;
    wins: number;
    lost: number;
    onGoingGame: number;

    static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            gameType: "string",
            regTime: "string",
            wins: "int",
            lost: "int",
            onGoingGame: "int"
        },
        primaryKey: 'id',
    };
}