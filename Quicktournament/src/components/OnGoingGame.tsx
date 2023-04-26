import { Avatar } from "@rneui/base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { NewPlayer } from "../interfaces/interfaces";
import { Player } from "../models/Player";
import RealmContext from '../models/RealmConfig';

const { useRealm } = RealmContext;

interface OnGoingGameProps {
    game: NewPlayer[],
    fetchOngoingGame: () => void;
}

const OnGoingGame = ({game, fetchOngoingGame} : OnGoingGameProps) => {

    const realm = useRealm();

    const handleGameEnd = (player: NewPlayer) => {
        let winningPlayer = realm.objects<Player>("Player").filtered(`id=${player.id}`);
        let getLosingPlayer = game.find(p => p.id !== player.id);
        let losingPlayer = getLosingPlayer && realm.objects<Player>("Player").filtered(`id=${getLosingPlayer.id}`)
        realm.write(() => {
            winningPlayer[0].wins = winningPlayer[0].wins + 1;
            if(losingPlayer) {
                losingPlayer[0].onGoingGame = 0;
                losingPlayer[0].lost = 1;
            }
        });

        fetchOngoingGame();
    }

    return (
        <View style={styles.ongoingGameContainer}>
            {
                game.length < 1 ? (
                    <View>
                        <Text>Ei pelejä käynnissä</Text>
                    </View>
                ) : game.map((player, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => handleGameEnd(player)}>
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