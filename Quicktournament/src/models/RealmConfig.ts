import { createRealmContext } from '@realm/react';
import { Player } from './Player';
import { Game } from './Game';

/*
export const RealmContext = createRealmContext({
    schema: [Player, Game],
    deleteRealmIfMigrationNeeded: true
});

*/

const config = {
    schema: [Player, Game],
  };
export default createRealmContext(config);

