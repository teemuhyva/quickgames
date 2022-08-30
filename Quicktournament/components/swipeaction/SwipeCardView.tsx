/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NewPlayer } from '../../App';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

type PlayerCardProps = {
    player: NewPlayer,
    onSwipeLeft(): void
}

const LeftActions = () => {
    console.log("action handled")
    return (
        <View>
            <Text>Poista pelaaja</Text>
        </View>
    );
}

const PlayerCardView = ({ player, onSwipeLeft }: PlayerCardProps) => {
    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={LeftActions}
                leftThreshold={20}
                onSwipeableRightOpen={onSwipeLeft}
            >
                <View style={styles.row}>
                    <Text style={styles.text}>{player.playerName}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginTop: 30,
        padding: 2,
    },
});

export default PlayerCardView;
