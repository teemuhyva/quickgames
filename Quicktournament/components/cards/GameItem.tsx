/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NewPlayer } from '../../App';
import { getCurrentGame } from '../../Realm/Realm';

interface CurrentGame {
    id: number;
    player1: string;
    player2: string;
    finished: boolean;
}

type GameItemProps = {
    playerWaitingList: NewPlayer[]
}

const GameItem = (players: GameItemProps) => {

    const [game, setGame] = useState<CurrentGame>();
    const playerList = players.playerWaitingList;

    useEffect(() => {
        const fetchCurrentGame = async () => {
            const data = await getCurrentGame();
            if (data.length < 1) {
                createGame();
            } else {
                data.map((g) => {
                    if (g === undefined) {
                        createGame();
                    } else {
                        setGame(g);
                    }
                });
            }
        };

        fetchCurrentGame();
    }, []);

    const createGame = () => {
        let newGame: CurrentGame = { id: 0, player1: '', player2: '', finished: false };
        if (playerList.length >= 2) {
            newGame = {
                id: playerList[0].id,
                player1: playerList[0].playerName,
                player2: playerList[1].playerName,
                finished: false,
            };

            setGame(newGame);
        }
    };

    return (
        <View style={styles.gameview}>
            <Text>{game?.player1}</Text>
            <Text>{game?.player2}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    gameview: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        marginBottom: 20,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GameItem;
