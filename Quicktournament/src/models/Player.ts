import {Realm} from '@realm/react'

export class Player {
    id!: number;
    playerName!: string;
    gameType!: string;
    regTime: string;
    wins: number;

    static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            gameType: "string",
            regTime: "string",
            wins: "int"
        },
        primaryKey: 'id',
    };
}