import React, { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { currentDate, serializeObject } from "../utils/utils";
import { Game } from "../models/Game";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RealmContext from '../Realm/RealmConfig';
import { generateEndedGamesList } from "../../store/reducers/gameSlice";
import { NewPlayer } from "../interfaces/interfaces";
import { generateWaitingList } from "../../store/reducers/playerSlice";
import { Player } from "../models/Player";

const { useRealm } = RealmContext;

const Games = ({navigation}) => {

    const games: Game[] = useSelector((state: RootState) => state.game.games);
    const players: NewPlayer[] = useSelector((state: RootState) => state.player.players);

    const dispatch = useDispatch();
    const realm = useRealm();

    useEffect(() => {
        //deleteAll();
        if(!games.length) {
            const fetchGames = fetchOngoingGame();
            if(fetchGames !== undefined) {
                dispatch(generateEndedGamesList(fetchGames));
            }
        }
    },[]);

    useEffect(() => {
        if(players.length < 1) {
            const playerList = getPlayers();
            if(playerList.length) {
                dispatch(generateWaitingList(playerList));
            } 
        }
    },[])

    const deleteAll = () => {
        realm.write(() => {
            realm.deleteAll();
        });
    }

    const fetchOngoingGame = () => {
        let allGames: any
        allGames = realm.objects<Game>("Game");
        
        const games: Game[] = [];
        allGames.map((game: Game) => {
            games.push(serializeObject(game));
        })

        return games;
    }

    const getPlayers = () => {

        let playerList: any;
        playerList = realm.objects<Player>("Player");
    
        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            players.push(serializeObject(player));
        });
        return players;
    }

    return (
        <View style={styles.container}>
           <Card>
                <Card.Title>Biljardi {currentDate()}</Card.Title>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('PlayerList', { gameType: 'billiard'})}>
                        <Image 
                            source={require('../assets/pool.png')}
                            style={{ width: 344, height: 194}}/>
                    </TouchableOpacity>
                </View>
            </Card>
            <Card>
                <Card.Title>Snooker {currentDate()}</Card.Title>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('PlayerList', { gameType: 'snooker'})}>
                        <Image
                            source={require('../assets/snooker.png')}
                            style={{ width: 344, height: 194}}/>
                    </TouchableOpacity>
                    
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Games;