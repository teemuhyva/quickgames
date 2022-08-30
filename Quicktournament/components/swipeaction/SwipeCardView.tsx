/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';


export const PlayerCardView = props => {
    const { data } = props;

    return (
        <View style={styles.row}>
            <Text style={styles.text}>{data.item.playerName}</Text>
        </View>
    );
};

export const SwipeShowDialogAction = props => {
    const { rightActionActivated, swipeAnimatedValue, data } = props;

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => console.log("touched")}>
                <View style={styles.container}>
                    <PlayerDialog
                        showDialog={setShowPlayerDialog}
                        showPlayerDialog={showPlayerDialog}
                        addPlayer={addPlayer}
                        id={playerWaitingList.length} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );


};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        marginBottom: 20,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
});
