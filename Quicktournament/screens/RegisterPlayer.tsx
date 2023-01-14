import { format } from "date-fns";
import React, { useState } from "react";
import { SafeAreaView, TextInput, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { GameType, NewPlayer } from "../interfaces/interfaces";
import { getPlayerWaitingList, createPlayer } from "../Realm/Realm";

const RegisterNewPlayer = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [open, setOpen] = useState(false);
    const [game, setGame] = useState('');
    const [items, setItems] = useState([
        { label: 'Biljardi', value: 'billiard' },
        { label: 'Snooker', value: 'snooker' }
    ]);

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
            wins: 0
        };

        createPlayer(player);

        if (gametype === 'billiard') {
            navigation.navigate('Biljardi', { gametype: game });
        } else {
            navigation.navigate('Snooker', { gametype: game });
        }

    };

    return (
        <SafeAreaView>
            <TextInput
                placeholder="Pelaajan nimi"
                onChangeText={setPlayerName}
            />
            <DropDownPicker
                open={open}
                value={game}
                items={items}
                setOpen={setOpen}
                setValue={setGame}
                setItems={setItems}
            />
            <Button title='Submit' onPress={() => addPlayer(playerName, game)} />
        </SafeAreaView>
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

export default RegisterNewPlayer;