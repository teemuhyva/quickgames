import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { NewPlayer } from '../interfaces/interfaces';
import { getPlayerWaitingList } from "../Realm/Realm";
import PlayerList from "../components/players/PlayerList";
import { Avatar, Divider } from "@rneui/themed";
import OnGoingGame from "../components/cards/GameItem";

const Games = ({ route }) => {

    const { gametype } = route.params;
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);
    const [inGamePlayers, setIngamePlayers] = useState<NewPlayer[]>([]);

    useEffect(() => {
        fetchPlayerWaitingList();
        if(playerWaitingList.length) {
            getNextGamePlayers();
        } 
    }, []);

    /* TODO: move this method to another location where all logic can be */
    const fetchPlayerWaitingList = async () => {
        const data = await getPlayerWaitingList(gametype);

        const players = [...playerWaitingList];
        data.map((player: NewPlayer) => {
            const exists = players.find(p => p.id === player.id);
            if(!exists) {
                let p: NewPlayer = {
                    id: player.id,
                    playerName: player.playerName,
                    gameType: player.gameType,
                    regTime: player.regTime,
                    gameStatus: player.gameStatus,
                    wins: player.wins
                }
    
                players.push(p);

                setPlayerWaitingList(players);
            }
        });
    };

    const getNextGamePlayers = () => {
        const currentGame: NewPlayer[] = [];
        playerWaitingList.forEach(p => {
            if(p.gameStatus === 'ongoing') {
                currentGame.push(p);
            }
        })
        setIngamePlayers(currentGame);
    }

    return (
        <>
            <OnGoingGame inGamePlayers={inGamePlayers} />
            <Divider style={styles.divider}/>
            <PlayerList waitingList={playerWaitingList}/>
        </>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: 20,
        color: 'red',
        padding: 10
    }
});

export default Games;