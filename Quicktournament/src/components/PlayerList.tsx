
import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NewPlayer } from "../interfaces/interfaces";
import OnGoingGame from "./OnGoingGame";
import WaitingList from "./WaitinList";
import { Button } from "react-native-elements";
import RegisterNewPlayer from "./RegisterPlayer";
import RealmContext from '../models/RealmConfig';
import { Player } from "../models/Player";

const { useRealm } = RealmContext;

const PlayerList = ({ route }) => {

    const { gameType } = route.params;
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);
    const [onGoingGame, setOnGoingGame] = useState<NewPlayer[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const realm = useRealm();

    useEffect(() => {
       fetchPlayerWaitingList();
    }, []);

    useEffect(() => {
        fetchOngoingGame();
    }, [])

    if (playerWaitingList === undefined) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Ladataan pelaajat ja pelit</Text>
            </View>
        );
    }

    const fetchPlayerWaitingList = () => {
        let playerList: any;
        playerList = realm.objects<Player>("Player").filtered("gameType == $0 && onGoingGame == 0 && lost == 0", gameType);

        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            players.push(player);
        });

        setPlayerWaitingList(players);
    };

    const fetchOngoingGame = () => {
        let playerList: any;
        playerList = realm.objects<Player>("Player").filtered("gameType == $0 && onGoingGame == 1", gameType);

        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            players.push(player);
        });

        setOnGoingGame(players);
    }

    const registeration = (value: boolean, player: NewPlayer) => {        
        setPlayerWaitingList([...playerWaitingList, player]);
        setIsVisible(value);
    }

    const addPlayerToGame = (player: NewPlayer) => {
        setPlayerWaitingList(playerWaitingList.filter(p => p.id !== player.id)); //remove player from waitinglist
        setOnGoingGame([...onGoingGame, player]);
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <OnGoingGame game={onGoingGame} fetchOngoingGame={fetchOngoingGame}/>
                    <WaitingList waitingList={playerWaitingList} addPlayerToGame={addPlayerToGame}/>
                    
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Rekisteröidy"
                        buttonStyle={{
                            backgroundColor: '#03DAC5',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 10,
                            marginVertical: 10,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => setIsVisible(true)}
                    />
                </View>
            </View>
            <RegisterNewPlayer visible={isVisible} registeration={registeration}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginVertical: 580,
        position: 'absolute'
    },
});

export default PlayerList;
