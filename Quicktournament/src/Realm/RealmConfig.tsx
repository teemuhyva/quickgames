import {createRealmContext, Realm} from '@realm/react';
import { Player } from '../models/Player';
import { Game } from '../models/Game';

const config = {
    schema: [Player, Game],
    schemaVersion: 3,
    migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 4) {
          const oldGames = oldRealm.objects("Game" as never) as Realm.Results<Game>;
    
          for (let i = 0; i < oldGames.length; i++) {
            migrateGame(oldGames[i], newRealm.create("Game", {}));
          }
        }
      }
}

function migrateGame(oldGame: any, newGame: any) {
    // Add the new property
    newGame.gameType = "default-game-type";
  
    // Copy over the old properties
    newGame._id = oldGame._id;
    newGame.player1Id = oldGame.player1Id;
    newGame.player1 = oldGame.player1;
    newGame.player1Score = oldGame.player1Score;
    newGame.player2Id = oldGame.player2Id;
    newGame.player2 = oldGame.player2;
    newGame.player2Score = oldGame.player2Score;
    newGame.finished = oldGame.finished;
  }

const { RealmProvider, useQuery, useRealm} = createRealmContext(config);
export default { RealmProvider, useQuery, useRealm}
    