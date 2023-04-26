import { Avatar } from "@rneui/base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import RealmContext from '../models/RealmConfig';
import { NewPlayer } from "../interfaces/interfaces";

const { useRealm } = RealmContext;

interface OnGoingGameProps {
    onGoingGame: NewPlayer[]
}

const OnGoingGame = ({ onGoingGame} : OnGoingGameProps) => {

    const handleGameEnd = () => {

    }

    return (
        <View style={styles.ongoingGameContainer}>
            {
                onGoingGame.length < 1 ? (
                    <View>
                        <Text>Ei pelejä käynnissä</Text>
                    </View>
                ) : onGoingGame.map((player, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => handleGameEnd()}>
                            <Card style={styles.cardStyle}>
                                <Card.Title>
                                    <Avatar rounded 
                                            icon={{
                                            name: 'person-outline', 
                                            type: 'material', 
                                            size: 26}}
                                            containerStyle={{ backgroundColor: '#c2c2c2'}}/>
                                </Card.Title>
                                <View style={styles.gameinfoWrapper}>
                                    <Text>{player.playerName}</Text>
                                    <Text>Voitot: {player.wins}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    ongoingGameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 240,
        backgroundColor: "#F2E7FE",
        gap: 16
    },
    gameinfoWrapper: {
        flexDirection: 'column',
    },
    cardStyle: {
    }
});

export default OnGoingGame;