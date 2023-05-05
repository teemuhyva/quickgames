import { Realm } from '@realm/react';

{/* This is only for statistic purposes */}
export class Game {
    _id!: number;
    gameType: string;
    player1Id?: number;
    player1?: string;
    player1Score?: number;
    player2Id?: number;
    player2?: string;
    player2Score?: number;
    finished: number;

    public static schema = {
        name: "Game",
        properties: {
            _id: "int",
            gameType: "string",
            player1Id: "int",
            player1: "string",
            player1Score: "int",
            player2Id: { type: "int", optional: true },
            player2: { type: "string", optional: true },
            player2Score: { type: "int", optional: true },
            finished: "int"
        },
        primaryKey: '_id',
    };
}