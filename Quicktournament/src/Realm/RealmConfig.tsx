import {createRealmContext,Realm} from '@realm/react';
import { Player } from '../models/Player';
import { Game } from '../models/Game';

const config = {
    schema: [Player, Game],
    deleteRealmIfMigrationNeeded: true,
    schemaVersion: 2
}

export default createRealmContext(config);
    