import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NewPlayer } from "../interfaces/interfaces";
import { ListItem } from "react-native-elements";
import { Avatar } from "@rneui/base";

interface WaitingListProps {
    waitingList: NewPlayer[]
}

const WaitingList = ({ waitingList }: WaitingListProps) => {
    return (
        <View style={styles.waitingListContainer}>
            {
                !waitingList.length ?
                <View>
                    <Text>Pelaajia ei löytynyt</Text>
                </View> :
                <View>
                    {waitingList.map((player, i) => {
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
        </View>
    )
}

const styles = StyleSheet.create({
    waitingListContainer: {
        justifyContent: 'center'
    },
    listview: {
        flexDirection: 'column'
    },
});

export default WaitingList;