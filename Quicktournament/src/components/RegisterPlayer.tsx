
import { format } from "date-fns";
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { createPlayer, getPlayerWaitingList } from "../Realm/Realm";
import { GameType, NewPlayer } from "../interfaces/interfaces";
import { Button, ButtonGroup, Input } from "@rneui/base";

const RegisterNewPlayer = ({ visible, registeration }) => {

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
        /*
        const type: GameType = gametype === 'snooker' ? 'snooker' : 'billiard';
        let player: NewPlayer = {
            id: await getOrCreatePlayerId(),
            playerName: playerName,
            gameType: type,
            regTime: format(new Date(), "dd.MM HH:mm"),
            wins: 0
        };
*/
       // createPlayer(player);
        registeration(false);
    };



    return (
        <View style={styles.modalCenteredView}>
            <Modal
                style={styles.modalStyle}
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    addPlayer(playerName, game);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Input
                                label="Pelaaja"
                                placeholder="Pelaajan nimi"
                                onChangeText={setPlayerName}
                            />
                        </View>
                        <ButtonGroup
                            buttons={['BILJARDI', 'SNOOKER']}
                            selectedIndex={selectedIndex}
                            onPress={(value) => {
                                setSelectedIndex(value)
                                value === 0 ? setGame('billiard') : setGame('snooker');
                            }}/>
                        <Button title='Rekisteröi' onPress={() =>  addPlayer(playerName, game)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center',
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});

export default RegisterNewPlayer;