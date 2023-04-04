import Realm from 'realm';
import { NewPlayer, Status } from '../interfaces/interfaces';

class Player {
    public static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            gameType: "string",
            regTime: "string",
            gameStatus: "string",
            wins: "int"
        },
    };

    public id: number;
    public playerName: string;
    public gameType: string;
    public regTime: string;
    public gameStatus: Status;
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
        schemaVersion: 5,
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
        gameStatus: 'waiting',
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
                gameStatus: player.gameStatus,
                wins: player.wins
            }
        )
    });

    console.log(`Player added with name 
    ${newPlayer.playerName} 
    ${newPlayer.id} 
    and wins: ${newPlayer.wins}
    with gametype ${newPlayer.gameType}`);
}

async function playerWaitingListRealm(gameType?: string) {
    const playerRealm = await Realm.open({
        path: "Player",
        schema: [Player],
        schemaVersion: 5
    });
/*
    playerRealm.write(() => {
        const players = playerRealm.objects<Player>(Player.schema.name);
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

async function playerUpdate(player: Player) {
    const playerRealm = await Realm.open({
        path: "Player",
        schema: [Player],
        schemaVersion: 5
    });

    playerRealm.write(() => {
        console.log(player.id);
        let searchPlayer = playerRealm.objects<Player>("Player").filtered("id == $0", player.id)[0];
        console.log(`Pelaaja ${player.id} löytyi: ${searchPlayer.playerName}`);
        searchPlayer.gameStatus = "ongoing"
    })

    let allPlayers = playerRealm.objects<Player>("Player")
    allPlayers.map((player) =>  console.log(`${player.playerName} ${player.id} ${player.gameStatus}`))
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

export const updatePlayerStatus = async (player: Player) => {
    playerUpdate(player);
}