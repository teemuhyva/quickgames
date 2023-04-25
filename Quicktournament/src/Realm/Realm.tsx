import RealmContext from '../models/RealmConfig';
import { Player } from '../models/Player';
import { Game } from '../models/Game';
import { NewPlayer } from '../interfaces/interfaces';

const { useRealm, useObject } = RealmContext;

export function createPlayer(player: NewPlayer) {
    const realm = useRealm();
    realm.write(() => {
        realm.create('Player', player);
    })
}

export function getPlayers(gameType: string = "") {
    const realm = useRealm();

    let playerList: any;
    if(gameType === "") {
        playerList = realm.objects<Player>("Player");
    } else {
        playerList = realm.objects<Player>("Player").filtered("gameType == $0", gameType);
    }
    
    console.log(playerList);
    return playerList;
}

export function updatePlayer(player: NewPlayer) {
    const realm = useRealm();
    const updatePlayer = useObject(Player, player.id);

    if(updatePlayer) {
        realm.write(() => {
            updatePlayer.playerName = player.playerName;
            updatePlayer.wins = player.wins;
        })
    }
}

export function createGame(id: Number, player1: NewPlayer, player2: NewPlayer) {
    const realm = useRealm();
    realm.write(() => {
        realm.create('Game', { _id: id, player1: player1, player2: player2, finished: false });
    })
}

export function getOngoingGame() {
    const realm = useRealm();
    const runningGame = realm.objects<Game>("Game").filtered("finished == $0,", false);
    console.log(JSON.stringify(runningGame));
    return runningGame;
}