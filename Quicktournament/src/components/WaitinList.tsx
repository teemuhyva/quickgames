import { Avatar } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import RealmContext from '../Realm/RealmConfig';
import { Game, NewPlayer } from "../interfaces/interfaces";
import { Player } from "../models/Player";
import { useDispatch } from "react-redux";
import { updateGame } from "../../store/reducers/gameSlice";

const { useRealm } = RealmContext;

interface WaitingListProps {
    waitingList: NewPlayer[]
}

const WaitingList = (props: WaitingListProps) => {

    const realm = useRealm();
    const dispatch = useDispatch();

    const startGame = (player: NewPlayer) => {
        let updatePlayer = realm.objects<Player>("Player").filtered(`id=${player.id}`);
        realm.write(() => {
            updatePlayer[0].onGoingGame = 1;
        })

        let game = realm.objects<Game>("Game");
        if(game.length) {
            realm.write(() => {
                game[0].player2Id = player.id
                game[0].player2 = player.playerName
                game[0].player2Score = 0
            })

            dispatch(updateGame(game[0]));
        } else {
            const createGame: Game = {
                _id: Math.floor(Math.random() * 1000),
                player1Id: player.id,
                player1: player.playerName,
                player1Score: 0,
                player2Id: undefined,
                player2: undefined,
                player2Score: undefined,
                finished: 0
            }

            realm.write(() => {
                realm.create('Game', createGame);
            })

            dispatch(updateGame(createGame));
        }
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