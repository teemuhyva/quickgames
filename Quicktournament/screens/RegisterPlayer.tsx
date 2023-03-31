import { ButtonGroup, Button, Input  } from '@rneui/themed';
import { format } from "date-fns";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { GameType, NewPlayer } from "../interfaces/interfaces";
import { createPlayer, getPlayerWaitingList } from "../Realm/Realm";

const RegisterNewPlayer = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [game, setGame] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const getOrCreatePlayerId = async () => {
        const data = await getPlayerWaitingList();
        if (data.length < 1) {
            return 1; //if playerlist is empty create id of 1
        } else {
            return data[data.length - 1].id + 1;
        }
    }

    const addPlayer = async (playerName: string, gametype: string) => {
        const type: GameType = gametype === 'snooker' ? 'snooker' : 'billiard';
        let player: NewPlayer = {
            id: await getOrCreatePlayerId(),
            playerName: playerName,
            gameType: type,
            regTime: format(new Date(), "dd.MM HH:mm"),
            gameStatus: 'waiting',
            wins: 0
        };

        createPlayer(player);
        navigation.navigate('Pelit', { gametype: game });
    };

    return (
        <View style={styles.registerView}>
            <View style={styles.playerInput}>
                <Input
                    placeholder="Pelaajan nimi"
                    onChangeText={setPlayerName}
                />
            </View>
            <View style={styles.gameType}>
                <ButtonGroup 
                    buttons={['BILJARDI', 'SNOOKER']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value)
                        value === 0 ? setGame('billiard') : setGame('snooker');
                    }}/>
            </View>
            <View style={styles.register}>
                <Button title='Rekisteröi' onPress={() => addPlayer(playerName, game)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    registerView: {
        flex: 0.5,
        top: '20%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
    },
    playerInput: {
        flex: 0.3,
    },
    gameType: {
        flex: 0.3,
    },
    register: {
        flex: 0.3,
    }
});

export default RegisterNewPlayer;