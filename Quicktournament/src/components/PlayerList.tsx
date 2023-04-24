
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NewPlayer } from "../interfaces/interfaces";
import { getPlayerWaitingList } from "../Realm/Realm";
import OnGoingGame from "./OnGoingGame";
import WaitingList from "./WaitinList";
import { Button } from "react-native-elements";
import RegisterNewPlayer from "./RegisterPlayer";

const PlayerList = ({ route }) => {

    const { gametype } = route;
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);
    const [isVisible, setIsVisible] = useState(false);

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

    const fetchPlayerWaitingList = async () => {
        const data = await getPlayerWaitingList(gametype);

        const players = [...playerWaitingList];
        data.map((player: NewPlayer) => {
            let p: NewPlayer = {
                id: player.id,
                playerName: player.playerName,
                gameType: player.gameType,
                regTime: player.regTime,
                wins: player.wins
            }

            players.push(p);
        });

        setPlayerWaitingList(players);
    };

    const registeration = (value: boolean) => {
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
                            marginVertical: 300,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => registeration(true)}
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
        flexDirection: 'column'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
});

export default PlayerList;
