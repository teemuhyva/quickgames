import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NewPlayer } from "../interfaces/interfaces";
import { ListItem } from "react-native-elements";
import { Avatar } from "@rneui/base";
import RealmContext from '../models/RealmConfig';
import { Player } from "../models/Player";

const { useRealm } = RealmContext;

interface WaitingListProps {
    waitingList: NewPlayer[],
    addPlayerToGame: (player: NewPlayer) => void
}

const WaitingList = (props: WaitingListProps) => {

    const realm = useRealm();

    const startGame = (player: NewPlayer) => {
        let updatePlayer = realm.objects<Player>("Player").filtered(`id=${player.id}`);
        realm.write(() => {
            updatePlayer[0].onGoingGame = 1;
        })
        props.addPlayerToGame(player);
    }

    return (
        <View style={styles.waitingListContainer}>
            {
                !props.waitingList.length ?
                <View>
                    <Text>Ei jonossaolevia pelaajia</Text>
                </View> :
                <View>
                    {props.waitingList.map((player, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => startGame(player)}>
                                <ListItem  bottomDivider style={styles.listview}>
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
                            </TouchableOpacity>
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