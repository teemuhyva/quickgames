/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { FlatList, StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import PlayerDialog from './components/dialogs/PlayerDialog';
import PlayerCard from './components/cards/gameCardItem';

export interface Player {
  id: string;
  player1: string;
  player2: string;
}

const App: () => ReactNode = () => {

  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [playerList, setPlayerList] = useState<Player[]>([]);

  const addPlayer = ({ id, player1, player2 }: Player) => {
    let player: Player = {
      id: id,
      player1: player1,
      player2: player2
    }

    const players = [...playerList];
    players.push(player)

    setPlayerList(players);
    setShowPlayerDialog(!showPlayerDialog);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <View style={styles.container}>
            <PlayerDialog
              showDialog={setShowPlayerDialog}
              showPlayerDialog={showPlayerDialog}
              addPlayer={addPlayer}
              id={playerList.length.toString()} />
          </View>
          <TouchableHighlight onPress={() => { setShowPlayerDialog(!showPlayerDialog); }}>
            <View>
              <Icon name="plus-circle" size={40} color="blue" />
            </View>
          </TouchableHighlight>
          <PlayerCard playerList={playerList} />
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
