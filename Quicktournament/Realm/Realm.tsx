import Realm from 'realm';
import { NewPlayer } from '../App';

class Player {
    public static schema = {
        name: "Player",
        properties: {
            id: "int",
            playerName: "string",
            wins: "int"
        },
    };

    public id: number;
    public playerName: string;
    public wins: number;
}

async function createPlayerRealm(player: NewPlayer) {

    const playerRealm = await Realm.open({
        path: "Player",
        schemaVersion: 2,
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

    let newPlayer: NewPlayer = { id: 0, playerName: '', wins: 0 };

    playerRealm.write(() => {
        newPlayer = playerRealm.create<Player>(
            "Player",
            {
                id: player.id,
                playerName: player.playerName,
                wins: player.wins
            }
        )
    });

    console.log(`Player added with name ${newPlayer.playerName} and wins: ${newPlayer.wins}`);
}

async function playerWaitingListRealm() {
    const playerRealm = await Realm.open({
        path: "Player",
        schema: [Player],
        schemaVersion: 2
    });

    let players = playerRealm.objects<Player>("Player");
    console.log(`Pelaajia kannassa ${players.map((player) => player.playerName)}`);
    return players;
}

export const getPlayerWaitingList = async () => {
    return await playerWaitingListRealm();
}

export const createPlayer = (player: Player) => {
    createPlayerRealm(player)
}