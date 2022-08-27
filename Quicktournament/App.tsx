/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, TouchableHighlight, View } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import PlayerDialog from './components/dialogs/PlayerDialog';
import PlayerCard from './components/cards/gameCardItem';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { gameRealm } from './Realm/Realm';

export interface Game {
  id: string;
  player1: string;
  player2: string;
  win: string
}

export interface Player {
  player: string;
  wins: number;
}

const App: () => ReactNode = () => {

  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [gameslist, setGamesList] = useState<Game[]>([]);


  const initGamesList = () => {
    const games = gameRealm.objects("Game");
    console.log(games);
  }

  const addGame = ({ id, player1, player2, win }: Game) => {
    let game: Game;
    const games = [...gameslist];

    setShowPlayerDialog(!showPlayerDialog);

    setGamesList(games);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <View style={styles.container}>
            <PlayerDialog
              showDialog={setShowPlayerDialog}
              showPlayerDialog={showPlayerDialog}
              addGame={addGame}
              id={gameslist.length.toString()} />
          </View>
          <TouchableHighlight onPress={() => { setShowPlayerDialog(!showPlayerDialog); }}>
            <View>
              <Icon name="plus-circle" size={40} color="blue" />
            </View>
          </TouchableHighlight>
          <PlayerCard gameslist={gameslist} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
