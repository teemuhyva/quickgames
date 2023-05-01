import { Avatar } from "@rneui/base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {  NewPlayer } from "../interfaces/interfaces";
import RealmContext from '../Realm/RealmConfig';
import { Player } from "../models/Player";
import { Game } from "../models/Game";
import { useDispatch, useSelector } from "react-redux";
import { addGamePlayed, updateGame } from "../../store/reducers/gameSlice";
import { updatePlayer } from "../../store/reducers/playerSlice";
import { RootState } from "../../store/store";

interface OnGoingGameProps {
    game: Game,
}

const { useRealm } = RealmContext;

const OnGoingGame = ({game} : OnGoingGameProps) => {
    const players: NewPlayer[] = useSelector((state: RootState) => state.player.players);
    const currentGame: Game = useSelector((state: RootState) => state.game.game);

    const dispatch = useDispatch();
    const realm = useRealm();

    const player1Wins = players.find(p => p.id === game.player1Id)?.wins;
   // const player2Wins = game.player2Id ? players.find(p => p.id === game.player2Id)?.wins : null;

    const handleGameEnd = (playerId: number = 0) => {

        //first handle playerlist for winning and losing players
        let winningPlayer = realm.objects<Player>("Player").filtered(`id=${playerId}`);
        let losingPlayer = currentGame.player1Id === playerId ? players.find(p => p.id === playerId) : players.find(p => p.id === game.player2Id);

        const gameWins = winningPlayer[0].wins + 1;

        realm.write(() => {
            winningPlayer[0].wins = gameWins;
        })

        realm.write(() => {
            losingPlayer ? losingPlayer.lost = 1 : null;
        })

        {/* if only one player and they will drop out remove from game */}
        if(game.player2 === "") {
            winningPlayer[0].lost = 1;
        }
        {/* If player gets 3 wins they will be removed from game*/}
        if(gameWins >= 3) {
            winningPlayer[0].hasThreeWins = 1;
        }

        //second handle game end and create new game
        let endCurrentGame = realm.objects<Game>("Game").filtered("finished=0");
        realm.write(() => {
            endCurrentGame[0].finished = 1;
        })

        dispatch(addGamePlayed(endCurrentGame[0]));
        
        const createGame: Game = {
            _id: Math.floor(Math.random() * 1000),
            player1: winningPlayer[0].playerName,
            player1Score: winningPlayer[0].wins,
            finished: 0
        }

        dispatch(updateGame(createGame));
        
    }

    return (
        <View style={styles.ongoingGameContainer}>
            {
                game.player1 === "" || game.player2 === "" ? (
                    <View>
                        <Text>Ei pelejä käynnissä</Text>
                    </View>
                ) : 
                (
                    <>
                        <TouchableOpacity onPress={() => handleGameEnd(game.player1Id)}>
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
                                    <Text>{game.player1}</Text>
                                    <Text>Voitot: {player1Wins}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleGameEnd(game.player2Id)}>
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
                                    <Text>{game.player2}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </>
                )               
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