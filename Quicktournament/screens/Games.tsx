import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getPlayerWaitingList, updatePlayerStatus } from "../Realm/Realm";
import OnGoingGame from "../components/cards/GameItem";
import PlayerList from "../components/players/PlayerList";
import { NewPlayer } from '../interfaces/interfaces';

const Games = ({ route }) => {

    const { gametype } = route.params;
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);
    const [inGamePlayers, setIngamePlayers] = useState<NewPlayer[]>([]);
    const [playerOngoing, setPlayerOngoing] = useState<NewPlayer>();

    useEffect(() => {
        fetchPlayerWaitingList();
        if(playerWaitingList.length) {
            getNextGamePlayers();
        } 
    }, [JSON.stringify(playerWaitingList), playerOngoing]);

    /* TODO: move this method to another location where all logic can be */
    const fetchPlayerWaitingList = async () => {
        const data = await getPlayerWaitingList(gametype);

        const players: NewPlayer[] = [];
        data.map((player: NewPlayer) => {
            players.push(player);
        });

        setPlayerWaitingList(players);
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

    const handleGameStatus = async(player: NewPlayer) => {
        await updatePlayerStatus(player);
        setPlayerOngoing(player);
    }

    return (
        <>
            <OnGoingGame players={inGamePlayers} />
            <PlayerList waitingList={playerWaitingList} handleGameStatus={handleGameStatus}/>
        </>
    )
}

const styles = StyleSheet.create({
    
});

export default Games;