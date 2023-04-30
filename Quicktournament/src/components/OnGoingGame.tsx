import { Avatar } from "@rneui/base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { NewPlayer } from "../interfaces/interfaces";
import RealmContext from '../Realm/RealmConfig';
import { Player } from "../models/Player";

interface OnGoingGameProps {
    game: NewPlayer[],
    fetchOngoingGame: () => void;
}

const { useRealm } = RealmContext;

const OnGoingGame = ({game, fetchOngoingGame} : OnGoingGameProps) => {
    
    const realm = useRealm();

    const handleGameEnd = (player: NewPlayer) => {
        
        let winningPlayer = realm.objects<Player>("Player").filtered(`id=${player.id}`);
        let getLosingPlayer = game.find(p => p.id !== player.id);
        let losingPlayer = getLosingPlayer && realm.objects<Player>("Player").filtered(`id=${getLosingPlayer.id}`)
        realm.write(() => {
            const gameWins = winningPlayer[0].wins + 1;
            if(losingPlayer) {
                winningPlayer[0].wins = gameWins;
                losingPlayer[0].onGoingGame = 0;
                losingPlayer[0].lost = 1;
            }

            {/* if only one player and they will drop out remove from game */}
            if(game.length < 2) {
                winningPlayer[0].lost = 1;
            }
            {/* If player gets 3 wins they will be removed from game*/}
            if(gameWins >= 3) {
                winningPlayer[0].hasThreeWins = 1;
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