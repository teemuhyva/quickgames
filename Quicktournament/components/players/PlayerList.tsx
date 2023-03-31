import { Avatar, ListItem } from "@rneui/themed";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NewPlayer } from "../../interfaces/interfaces";
import { updatePlayerStatus } from "../../Realm/Realm";

type PlayerListProps = {
    waitingList: NewPlayer[]
}

const PlayerList = (players: PlayerListProps) => {

    const handleGameStatus = async(player: NewPlayer) => {
        await updatePlayerStatus(player);
    }

    return (
        <>
            {!players.waitingList.length ?
                <View>
                    <Text>Pelaajia ei löytynyt</Text>
                </View> :
                <View>
                    {players.waitingList.map((player, i) => {
                        player.gameStatus === 'waiting'
                            return (
                                    <ListItem key={i} bottomDivider style={styles.listview} onPress={() => handleGameStatus(player)}>
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
    },
});

export default PlayerList;
