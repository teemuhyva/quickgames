import Realm from 'realm';
import { NewPlayer } from '../src/interfaces/interfaces';

class Player {
    public static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            gameType: "string",
            regTime: "string",
            wins: "int"
        },
    };

    public id: number;
    public playerName: string;
    public gameType: string;
    public regTime: string;
    public wins: number;
}

class Game {
    public static schema = {
        name: "Game",
        properties: {
            id: "int",
            player1: "string",
            player2: "string",
            finished: { type: 'bool', default: false }
        },
    };

    public id: number;
    public player1: string;
    public player2: string;
    public finished: boolean;
}

async function createPlayerRealm(player: Player) {

    const playerRealm = await Realm.open({
        path: "Player",
        schemaVersion: 4,
        schema: [Player],
        migration: (oldrealm, newrealm) => {
            if (oldrealm.schemaVersion < 2) {
                const oldPlayerObject = oldrealm.objects("Player");
                const newPlayerObject = newrealm.objects("Player");

                for (const obInx in oldPlayerObject) {
                    const oldPlayer = oldPlayerObject[obInx];
                    const newPlayer = newPlayerObject[obInx];
                }
            }
        }
    });

    let newPlayer: NewPlayer = {
        id: 0,
        playerName: '',
        gameType: '',
        regTime: '',
        wins: 0
    };

    playerRealm.write(() => {
        newPlayer = playerRealm.create<Player>(
            "Player",
            {
                id: player.id,
                playerName: player.playerName,
                gameType: player.gameType,
                regTime: player.regTime,
                wins: player.wins
            }
        )
    });

    console.log(`Player added with name 
    ${newPlayer.playerName} 
    and wins: ${newPlayer.wins}
    with gametype ${newPlayer.gameType}`);
}

async function playerWaitingListRealm(gameType?: string) {
    const playerRealm = await Realm.open({
        path: "Player",
        schema: [Player],
        schemaVersion: 4
    });

    if (gameType) {
        const players = playerRealm.objects<Player>("Player").filtered("gameType == $0", gameType);
        console.log(players);
        return players;
    }


    /* 
    playerRealm.write(() => {
        playerRealm.delete(players);
    });
    */

    return playerRealm.objects<Player>("Player");
}

async function currentGame() {
    const gameRealm = await Realm.open({
        path: "Game",
        schema: [Game],
        schemaVersion: 4,
        migration: (oldrealm, newrealm) => {
            if (oldrealm.schemaVersion < 2) {
                const oldPlayerObject = oldrealm.objects("Game");
                const newPlayerObject = newrealm.objects("Game");

                for (const obInx in oldPlayerObject) {
                    const oldPlayer = oldPlayerObject[obInx];
                    const newPlayer = newPlayerObject[obInx];
                }
            }
        }
    });

    let runningGame = gameRealm.objects<Game>("Game").filtered("finished == $0,", false);
    console.log(`Peli käynnissä:  ${runningGame.map((player) => `${player.player1}`)}`);
    return runningGame;
}

export const getPlayerWaitingList = async (gameType?: string) => {
    return await playerWaitingListRealm(gameType);
}

export const createPlayer = (player: Player) => {
    createPlayerRealm(player)
}

export const getCurrentGame = async () => {
    return await currentGame();
}