/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import PlayerDialog from './components/dialogs/PlayerDialog';
import PlayerCard from './components/cards/PlayerCardItem';
import { createPlayer, getPlayerWaitingList } from './Realm/Realm';

export interface Game {
  id: string;
  player1: string;
  player2: string;
  win: string
}

export interface NewPlayer {
  id: number;
  playerName: string;
  wins: number;
}

const App: () => ReactNode = () => {

  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);

  useEffect(() => {

    const fetchPlayerWaitingList = async () => {
      const data = await getPlayerWaitingList();

      const players = [...playerWaitingList];
      data.map((player: NewPlayer) => {
        let p: NewPlayer = {
          id: player.id,
          playerName: player.playerName,
          wins: player.wins
        }

        players.push(p);
      });

      setPlayerWaitingList(players);
    };

    fetchPlayerWaitingList();


  }, []);

  if (playerWaitingList === undefined) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Ladataan pelaajat ja pelit</Text>
      </View>
    );
  }

  const getOrCreatePlayerId = () => {
    if (playerWaitingList.length == 0) {
      return 1; //if playerlist is empty create id of 1
    } else {
      return playerWaitingList[playerWaitingList.length - 1].id + 1;
    }

  }

  const addPlayer = (playerName: string, wins: number) => {
    let player: NewPlayer = {
      id: getOrCreatePlayerId(),
      playerName: playerName,
      wins: wins
    };

    const players = [...playerWaitingList];
    players.push(player)
    setPlayerWaitingList(players);
    createPlayer(player);
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
              id={playerWaitingList.length} />
          </View>
          <TouchableHighlight onPress={() => { setShowPlayerDialog(!showPlayerDialog); }}>
            <View>
              <Icon name="plus-circle" size={40} color="blue" />
            </View>
          </TouchableHighlight>
          <PlayerCard playerWaitingList={playerWaitingList} />
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
  waitingText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 50
  }
});

export default App;

