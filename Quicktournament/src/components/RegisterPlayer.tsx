
import { Button, ButtonGroup, Input } from "@rneui/base";
import { format } from "date-fns";
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { NewPlayer } from "../interfaces/interfaces";
import { Player } from "../models/Player";
import RealmContext from "../Realm/RealmConfig"
import { useDispatch } from "react-redux";
import { add } from "../../store/reducers/playerSlice";

const { useRealm } = RealmContext;

const RegisterNewPlayer = ({ visible }) => {

    const [playerName, setPlayerName] = useState('');
    const [game, setGame] = useState('billiard');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const realm = useRealm();
    const dispatch = useDispatch()

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
        const type: string = game;
        const player: NewPlayer = {
            id: getOrCreatePlayerId(),
            playerName: playerName,
            gameType: type,
            regTime: format(new Date(), "dd.MM HH:mm"),
            wins: 0,
            lost: 0,
            onGoingGame: 0,
            hasThreeWins: 0
        };

        realm.write(() => {
            realm.create('Player', player);
        })
        
        dispatch(add(player));
    };



    return (
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
                        <Button containerStyle={{
                                    width: 200,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                }} title='Rekisteröi' onPress={() => createPlayer()} />
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 15,
    },
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});

export default RegisterNewPlayer;