
import { format } from "date-fns";
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, ButtonGroup, Input } from "@rneui/base";
import { GameType, NewPlayer } from "../interfaces/interfaces";
import { createPlayer, getPlayers } from "../realm/Realm";
import { useNavigation } from "@react-navigation/native";
import RealmContext from '../models/RealmConfig';
import { Player } from "../models/Player";

const { useRealm } = RealmContext;

const RegisterNewPlayer = ({ visible, registeration }) => {

    const [playerName, setPlayerName] = useState('');
    const [game, setGame] = useState<GameType>('billiard');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const realm = useRealm();

    const getOrCreatePlayerId = () => {
        let playerList: any;
        playerList = realm.objects<Player>("Player");
        if (playerList.length < 1) {
            return 1; //if playerlist is empty create id of 1
        } else {
            return playerList.length + 1;
        }
    }

    const createPlayer = () => {
        const type: GameType = game;
        const player: NewPlayer = {
            id: getOrCreatePlayerId(),
            playerName: playerName,
            gameType: type,
            regTime: format(new Date(), "dd.MM HH:mm"),
            wins: 0
        };

        realm.write(() => {
            realm.create('Player', player);
        })
        registeration(false, player);
    };



    return (
        <View style={styles.modalCenteredView}>
            <Modal
                style={styles.modalStyle}
                animationType="slide"
                transparent={true}
                visible={visible}
                >
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
                                value === 0 || value === undefined ? setGame('billiard') : setGame('snooker');
                            }}/>
                        <Button title='Rekisteröi' onPress={() => createPlayer()} />
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