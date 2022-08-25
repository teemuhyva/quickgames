/* eslint-disable prettier/prettier */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Button, Dialog } from "react-native-elements";
import { Player } from "../../App";

type PlayerDialogProps = {
    showDialog: Dispatch<SetStateAction<boolean>>
    showPlayerDialog: boolean
    addPlayer: ({ player1, player2 }: Player) => void
    id: string
}

const PlayerDialog = ({ showDialog, showPlayerDialog, addPlayer, id }: PlayerDialogProps) => {

    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');


    return (
        <Dialog isVisible={showPlayerDialog}>
            <Dialog.Title title="Lisää pelaajat" />
            <TextInput
                style={styles.input}
                onChangeText={setPlayer1}
                value={player1}
                placeholder="Pelaaja 1"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPlayer2}
                value={player2}
                placeholder="Pelaaja 2"
            />
            <View style={styles.button_view}>
                <View style={styles.button}>
                    <Button title="Lisää" onPress={() => addPlayer({ id, player1, player2 })} />
                </View>
                <View style={styles.button}>
                    <Button title="Peruuta" onPress={() => showDialog(false)} />
                </View>
            </View>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button_view: {
        flexDirection: 'row',
    },
    button: {
        width: 80,
        marginRight: 100,
    }
})

export default PlayerDialog;

