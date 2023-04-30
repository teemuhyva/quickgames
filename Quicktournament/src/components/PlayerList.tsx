
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { generateWaitingList, removePlayerFromWaitinList } from "../../store/reducers/playerSlice";
import { RootState } from "../../store/store";
import RealmContext from '../Realm/RealmConfig';
import { NewPlayer } from "../interfaces/interfaces";
import { Player } from "../models/Player";
import OnGoingGame from "./OnGoingGame";
import RegisterNewPlayer from "./RegisterPlayer";
import WaitingList from "./WaitinList";


const { useRealm } = RealmContext;

const PlayerList = ({ route }) => {

    const { gameType } = route.params;

    const players: NewPlayer[] = useSelector((state: RootState) => state.player.players);

    const [onGoingGame, setOnGoingGame] = useState<NewPlayer[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [playersByGameType, setPlayersByGametype] = useState<NewPlayer[]>([])

    const dispatch = useDispatch();
    const realm = useRealm()

    useEffect(() => {
       fetchOngoingGame();
    }, [])

    useEffect(() => {
        //deleteAll();
        setIsVisible(false);

        if(players.length < 1) {
            const playerList = getPlayers();
            if(playerList.length) {
                dispatch(generateWaitingList(playerList));
            } 
        } else {
            const playerList = players.filter((p) => p.gameType === gameType && p.onGoingGame == 0 && p.lost == 0);
            setPlayersByGametype(playerList);
        } 
    }, [players])

    if (players === undefined) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Ladataan pelaajat ja pelit</Text>
            </View>
        );
    }

    const deleteAll = () => {
        realm.write(() => {
            realm.deleteAll();
        });
    }

    const getPlayers = () => {

        let playerList: any;
        playerList = realm.objects<Player>("Player");
    
        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            const p = JSON.stringify(player)
            players.push(JSON.parse(p));
        });
        return players;
    }

    const fetchOngoingGame = () => {
        let playerList: any;
        playerList = realm.objects<Player>("Player").filtered("gameType == $0 && onGoingGame == 1 && hasThreeWins == 0 && lost == 0", gameType);

        const players: NewPlayer[] = [];
        playerList.map((player: NewPlayer) => {
            players.push(player);
        });

        setOnGoingGame(players);
    }

    const addPlayerToGame = (player: NewPlayer) => {
        dispatch(removePlayerFromWaitinList(player));
        setOnGoingGame([...onGoingGame, player]);
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <OnGoingGame game={onGoingGame} fetchOngoingGame={fetchOngoingGame}/>
                    <WaitingList waitingList={playersByGameType} addPlayerToGame={addPlayerToGame}/>
                    
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Rekisteröidy"
                        buttonStyle={{
                            backgroundColor: '#03DAC5',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 10,
                            marginVertical: 10,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => setIsVisible(true)}
                    />
                </View>
            </View>
            <RegisterNewPlayer visible={isVisible}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginVertical: 580,
        position: 'absolute'
    },
});

export default PlayerList;
