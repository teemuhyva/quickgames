import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NewPlayer } from "../../interfaces/interfaces";
import { getPlayerWaitingList } from "../../Realm/Realm";
import PlayerCard from "../cards/PlayerCardItem";

const PlayerList = ({ route }) => {

    const { gametype } = route;
    const [playerWaitingList, setPlayerWaitingList] = useState<NewPlayer[]>([]);

    useEffect(() => {
        fetchPlayerWaitingList();
    }, []);

    if (playerWaitingList === undefined) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Ladataan pelaajat ja pelit</Text>
            </View>
        );
    }

    const fetchPlayerWaitingList = async () => {
        const data = await getPlayerWaitingList(gametype);

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

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <PlayerCard playerWaitingList={playerWaitingList} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default PlayerList;
