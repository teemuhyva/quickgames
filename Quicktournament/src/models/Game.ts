import { Realm } from '@realm/react';

{/* This is only for statistic purposes */}
export class Game {
    _id!: number;
    player1?: string;
    player2?: string;
    finished?: boolean;

    public static schema = {
        name: "Game",
        properties: {
            _id: "int",
            player1: "string",
            player2: "string",
            finished: { type: 'bool', default: false }
        },
        primaryKey: '_id',
    };
}