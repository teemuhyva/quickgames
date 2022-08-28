/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import PlayerDialog from './components/dialogs/PlayerDialog';
import PlayerCard from './components/cards/PlayerCardItem';
import { createPlayer, getPlayerWaitingList } from './Realm/Realm'
import GameItem from './components/cards/GameItem';

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
      data.map((player: NewPlayer, idx) => {
        let p: NewPlayer = {
          id: player.id,
          playerName: player.playerName,
          wins: player.wins
        }

        players.push(p);
      })

      setPlayerWaitingList(players);
    }

    fetchPlayerWaitingList();


  }, []);

  if (playerWaitingList.length === 0 || playerWaitingList === undefined) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Ladataan pelaajat ja pelit</Text>
      </View>
    );
  }

  const addPlayer = ({ id, playerName, wins }: NewPlayer) => {
    let player: NewPlayer = {
      id: id,
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
          <View>
            <Text style={styles.waitingText}>Käynnissä oleva peli</Text>
          </View>
          <GameItem playerWaitingList={playerWaitingList} />
          <View>
            <Text style={styles.waitingText}>Jonossa olevat pelaajat</Text>
          </View>
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
