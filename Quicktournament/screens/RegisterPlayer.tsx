import { format } from "date-fns";
import React, { ReactNode, useState, useEffect } from "react";
import { View, SafeAreaView, TouchableHighlight, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GameType } from "../App";
import PlayerCard from "../components/cards/PlayerCardItem";
import PlayerDialog from "../components/dialogs/PlayerDialog";
import { NewPlayer } from "../interfaces/interfaces";
import { getPlayerWaitingList, createPlayer } from "../Realm/Realm";

export type GameType = 'billiard' | 'snooker' | undefined;

const RegisterPlayer = () => {

    const [showPlayerDialog, setShowPlayerDialog] = useState(false);
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);

    useEffect(() => {

        const fetchPlayerWaitingList = async () => {
            const data = await getPlayerWaitingList();

            const players = [...playerWaitingList];
            data.map((player: NewPlayer) => {
                let p: NewPlayer = {
                    id: player.id,
                    playerName: player.playerName,
                    gameType: player.gameType,
                    regTime: player.regTime,
                    wins: player.wins
                }

                players.push(p);
            });

            setPlayerWaitingList(players);
        };

        fetchPlayerWaitingList();


    }, []);

    if (playerWaitingList === undefined) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Ladataan pelaajat ja pelit</Text>
            </View>
        );
    }

    const getOrCreatePlayerId = () => {
        if (playerWaitingList.length == 0) {
            return 1; //if playerlist is empty create id of 1
        } else {
            return playerWaitingList[playerWaitingList.length - 1].id + 1;
        }

    }

    const addPlayer = (playerName: string, gametype: GameType, wins: number) => {
        let player: NewPlayer = {
            id: getOrCreatePlayerId(),
            playerName: playerName,
            gameType: gametype,
            regTime: format(new Date(), "dd.MM HH:mm"),
            wins: wins
        };

        const players = [...playerWaitingList];
        players.push(player)
        setPlayerWaitingList(players);
        createPlayer(player);
        setShowPlayerDialog(!showPlayerDialog);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <View style={styles.container}>
                        <PlayerDialog
                            showDialog={setShowPlayerDialog}
                            showPlayerDialog={showPlayerDialog}
                            addPlayer={addPlayer}
                            id={playerWaitingList.length} />
                    </View>
                    <TouchableHighlight onPress={() => { setShowPlayerDialog(!showPlayerDialog); }}>
                        <View>
                            <Icon name="plus-circle" size={40} color="blue" />
                        </View>
                    </TouchableHighlight>
                    <PlayerCard playerWaitingList={playerWaitingList} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginTop: 30,
        padding: 2,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    waitingText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50
    }
});

export default RegisterPlayer;