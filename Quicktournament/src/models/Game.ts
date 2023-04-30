import { Realm } from '@realm/react';

{/* This is only for statistic purposes */}
export class Game {
    _id!: number;
    player1?: string;
    player1Score: number;
    player2?: string;
    player2Score: number;

    public static schema = {
        name: "Game",
        properties: {
            _id: "int",
            player1: "string",
            player1Score: "int",
            player2: "string",
            player2Score: "int"
        },
        primaryKey: '_id',
    };
}