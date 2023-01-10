/* eslint-disable prettier/prettier */
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog } from "react-native-elements";
import { GameType } from "../../App";
import DropDownPicker from 'react-native-dropdown-picker';

type PlayerDialogProps = {
    showDialog: Dispatch<SetStateAction<boolean>>
    showPlayerDialog: boolean
    addPlayer: (playerName: string, gameType: GameType, wins: number) => void
    id: number
}

const PlayerDialog = (props: PlayerDialogProps) => {

    const [playerName, setPlayerName] = useState('');
    const [open, setOpen] = useState(false);
    const [game, setGame] = useState(null);
    const [items, setItems] = useState([
        { label: 'Biljardi', value: 'billiard' },
        { label: 'Snooker', value: 'snooker' }
    ]);
    const wins: number = 0;

    return (
        <Dialog isVisible={props.showPlayerDialog}>
            <Dialog.Title title="Lisää pelaajat" />
            <TextInput
                style={styles.input}
                onChangeText={setPlayerName}
                value={playerName}
                placeholder="Pelaajan nimi"
            />
            <DropDownPicker
                open={open}
                value={game}
                items={items}
                setOpen={setOpen}
                setValue={setGame}
                setItems={setItems}
            />
            <View style={styles.button_view}>
                <View style={styles.button}>
                    <Button title="Lisää" onPress={() => props.addPlayer(playerName, game, wins)} />
                </View>
                <View style={styles.button}>
                    <Button title="Peruuta" onPress={() => props.showDialog(false)} />
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

