import { Avatar, ListItem } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NewPlayer } from "../../interfaces/interfaces";
import { getPlayerWaitingList } from "../../Realm/Realm";

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
        <>
            {!playerWaitingList.length ?
                <View>
                    <Text>Pelaajia ei löytynyt</Text>
                </View> :
                <View>
                    {playerWaitingList.map((player, i) => {
                        return (
                            <ListItem key={i} bottomDivider style={styles.listview}>
                                <Avatar 
                                    rounded 
                                    icon={{
                                        name: 'person-outline', 
                                        type: 'material', 
                                        size: 26}}
                                    containerStyle={{ backgroundColor: '#c2c2c2'}}/>
                                <ListItem.Content>
                                    <ListItem.Title>{player.playerName}</ListItem.Title>
                                    <ListItem.Subtitle>{player.regTime}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )})
                    }
                </View>
           
            }
        </>
    );
}

const styles = StyleSheet.create({
    listview: {
        flexDirection: 'column'
    },
});

export default PlayerList;
