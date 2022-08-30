/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Dialog } from "react-native-elements";

type DialogProps = {
    showPlayerDialog: boolean
}

const DeletePlayerDialog = () => {
    return (
        <>
            <Dialog isVisible={false}>
                <Dialog.Title title="Poistetaan pelaaja" />
                <Text>
                    Testi
                </Text>
                <View style={styles.button_view}>
                    <View style={styles.button}>
                        <Button title="Lisää" />
                    </View>
                    <View style={styles.button}>
                        <Button title="Peruuta" />
                    </View>
                </View>
            </Dialog>
        </>
    );
};

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
    },
})

export default DeletePlayerDialog