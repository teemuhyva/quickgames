import { Avatar } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addGamePlayed, updateGame } from "../../store/reducers/gameSlice";
import { RootState } from "../../store/store";
import RealmContext from '../Realm/RealmConfig';
import { NewPlayer } from "../interfaces/interfaces";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { updatePlayer } from "../../store/reducers/playerSlice";


const { useRealm } = RealmContext;

const OnGoingGame = () => {
    const game: Game = useSelector((state: RootState) => state.game.game);
    const players: NewPlayer[] = useSelector((state: RootState) => state.player.players);

    const [ongoingGame, setOnGoingGame] = useState<Game>();

    const dispatch = useDispatch();
    const realm = useRealm();

    useEffect(() => {
        if(game) {
            if(game.player1 === "") {
                fetchOngoingGame();
            } else {
                if(game.finished === 0) {
                    setOnGoingGame(game);
                } else {
                    setOnGoingGame(undefined);
                }
            }
        } else {
            setOnGoingGame(undefined);
        }

    }, [game]);

    const fetchOngoingGame = () => {
        const ongoingGame = realm.objects<Game>("Game");
        if(ongoingGame[0] !== undefined) {
            const game = JSON.stringify(ongoingGame[0])
            dispatch(updateGame(JSON.parse(game)));
        }
    }

    const NoGamesGoing = () => {
        return (
            <View>
                <Text>Ei pelejä käynnissä</Text>
            </View>
        )
    }

    const CurrentGame = ({game}) => {
        const handleGameEnd = (playerId: number = 0) => {

            //first handle playerlist for winning and losing players
            let winningPlayer = realm.objects<Player>("Player").filtered(`id=${playerId}`);
            let losingPlayerId = game &&  game.player1Id !== playerId ? players.find(p => p.id === game.player1Id) : players.find(p => p.id === game.player2Id);
            let losingPlayer = realm.objects<Player>("Player").filtered(`id=${losingPlayerId?.id}`);
    
            const gameWins = winningPlayer[0].wins + 1;
    
            realm.write(() => {
                winningPlayer[0].wins = gameWins;
            })
    
            realm.write(() => {
                losingPlayer[0].lost = 1;
            })
    
            let getWinningPlayer = players.find(p => p.id === playerId);
            if(getWinningPlayer !== undefined) {
                const updateWinning = {
                    ...getWinningPlayer,
                    wins: gameWins
                }
                dispatch(updatePlayer(updateWinning));
            }
    
            if(losingPlayer !== undefined) {
                let getLosingPlayer = players.find(p => p.id === losingPlayerId?.id);
                if(getLosingPlayer !== undefined) {
                    const updateLosing = {
                        ...getLosingPlayer,
                        lost: 1,
                        onGoingGame: 0
                    }
                    dispatch(updatePlayer(updateLosing));
                }
            }
    
            {/* if only one player and they will drop out remove from game */}
            if(game.player2 === "") {
                realm.write(() => {
                    winningPlayer[0].lost = 1;
                })
            }
            {/* If player gets 3 wins they will be removed from game*/}
            if(gameWins >= 3) {
                realm.write(() => {
                    winningPlayer[0].hasThreeWins = 1;
                })
            }
    
            //second handle game end and create new game
            let endCurrentGame = realm.objects<Game>("Game").filtered("finished=0");
            if(endCurrentGame[0] !== undefined) {
                realm.write(() => {
                    endCurrentGame[0].finished = 1;
                })
            }
    
            dispatch(addGamePlayed(endCurrentGame[0]));
            dispatch(updateGame(endCurrentGame[0]));
            
            if(gameWins < 3) {
                const createGame: Game = {
                    _id: Math.floor(Math.random() * 1000),
                    player1Id: winningPlayer[0].id,
                    player1: winningPlayer[0].playerName,
                    player1Score: winningPlayer[0].wins,
                    finished: 0
                }
        
                realm.write(() => {
                    realm.create("Game", createGame);
                })
                dispatch(updateGame(createGame));
            }
        }
    
        return (
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
                            <Text>Voitot: { ongoingGame?.player1Score}</Text>
                        </View>
                    </Card>
                </TouchableOpacity>

                {
                    game.player2 !== "" && game.player2 !== undefined &&
                    <>
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
                                    <Text>Voitot: {ongoingGame?.player2Score}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </>
                }
                
            </>
        )
    }

    return (
        <View style={styles.ongoingGameContainer}>
            {
                !ongoingGame || ongoingGame.player1 === "" ? <NoGamesGoing /> : <CurrentGame game={ongoingGame}/>             
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