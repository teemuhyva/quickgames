
import React, { useEffect, useState } from "react";
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
    const [isVisible, setIsVisible] = useState(false);

    const realm = useRealm();

    useEffect(() => {
        fetchPlayerWaitingList();
    }, []);

    if (playerWaitingList === undefined) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Ladataan pelaajat ja pelit</Text>
            </View>
        );
    }

    const fetchPlayerWaitingList =() => {
        let playerList: any;
        playerList = realm.objects<Player>("Player").filtered("gameType == $0", gameType);

        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            players.push(player);
        });

        setPlayerWaitingList(players);
    };

    const registeration = (value: boolean, player: NewPlayer) => {        
        setPlayerWaitingList([...playerWaitingList, player]);
        setIsVisible(value);
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <OnGoingGame />
                    <WaitingList waitingList={playerWaitingList}/>
                    
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
