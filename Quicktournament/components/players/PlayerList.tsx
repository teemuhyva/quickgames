import { Avatar, ListItem } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NewPlayer } from "../../interfaces/interfaces";

type PlayerListProps = {
    waitingList: NewPlayer[];
    handleGameStatus: (player: NewPlayer) => void;
}

const PlayerList = (players: PlayerListProps) => {

    return (
        <>
            {!players.waitingList.length ?
                <View>
                    <Text>Pelaajia ei löytynyt</Text>
                </View> :
                <View>
                    { players.waitingList.map((player, i) => {
                            return player.gameStatus === 'waiting' && (
                                    <ListItem key={i} bottomDivider style={styles.listview} onPress={() => players.handleGameStatus(player)}>
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
