/* eslint-disable prettier/prettier */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Button, Dialog } from "react-native-elements";
import { Game, Player } from "../../App";

type PlayerDialogProps = {
    showDialog: Dispatch<SetStateAction<boolean>>
    showPlayerDialog: boolean
    addPlayer: ({ id, playerName, wins }: Player) => void
    id: number
}

const PlayerDialog = ({ showDialog, showPlayerDialog, addGame, id }: PlayerDialogProps) => {

    const [playerName, setPlayerName] = useState('');
    const [win, setWin] = useState('')
    const wins: number = 0;

    return (
        <Dialog isVisible={showPlayerDialog}>
            <Dialog.Title title="Lisää pelaajat" />
            <TextInput
                style={styles.input}
                onChangeText={setPlayerName}
                value={playerName}
                placeholder="Pelaajan nimi"
            />
            <View style={styles.button_view}>
                <View style={styles.button}>
                    <Button title="Lisää" onPress={() => addPlayer({ id, playerName, wins })} />
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

