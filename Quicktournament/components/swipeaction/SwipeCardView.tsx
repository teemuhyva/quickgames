/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export const PlayerCardView = (props: any) => {
    const { data } = props;

    return (
        <View style={styles.initialRow}>
            <View style={styles.row}>
                <Text style={styles.text}>Nimi: {data.item.playerName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Rekisteröity: {data.item.regTime}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Peli: {data.item.gameType}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },

    initialRow: {
        backgroundColor: 'lightgrey',
        marginBottom: 20,
        height: 120,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 50,
    },

    text: {
        fontSize: 15,
    },

    nametext: {
        alignItems: 'flex-start',
        paddingRight: 10
    },

    timetext: {
        alignItems: 'flex-end'
    }
});

