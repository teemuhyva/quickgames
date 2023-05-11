import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Game } from "../models/Game";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Scores = () => {

    const games: Game[] = useSelector((state: RootState) => state.game.games);
    const [finishedBilliard, setFinishedBilliard] = useState<Game[]>([]);
    const [finishedSnooker, setFinishedSnooker] = useState<Game[]>([]);

    useEffect(() => {
        setFinishedBilliard(games.filter(game => game.finished === 1 && game.gameType === 'billiard'));
        setFinishedSnooker(games.filter(game => game.finished === 1 && game.gameType === 'snooker'));
    }, [games])

    return (
        <View style={{ flex: 2 }}> 
            <>
                <Text style={styles.title}>Biljardi</Text>
                {
                    !finishedBilliard.length && <View style={styles.container}><Text>Pelejä ei ole pelattu</Text></View>
                }
                <View style={styles.container}>
                    {finishedBilliard.map((game, i) => {
                        return game.gameType === 'billiard' &&
                            <ListItem key={i} bottomDivider  containerStyle={styles.listItemContainer}>
                                <ListItem.Content style={{ flex: 1 }}>
                                    <Text style={styles.playerName}>Nimi: {game.player1}</Text>
                                    <Text style={styles.playerScore}>Voitot: {game.player1Score}</Text>
                                </ListItem.Content>
                                <ListItem.Content style={{ flex: 1 }}>
                                    <Text style={styles.playerName}>Nimi: {game.player2}</Text>
                                    <Text style={styles.playerScore}>Voitot: {game.player2Score}</Text>
                                </ListItem.Content>
                            </ListItem>
                     })}
                </View>
            </>
            <>
                <Text style={styles.title}>Snooker</Text>
                {
                    !finishedSnooker.length && <View style={styles.container}><Text>Pelejä ei ole pelattu</Text></View>
                }
                <View style={styles.container}>
                    {finishedSnooker.map((game, i) => {
                        return game.gameType === 'snooker' && <ListItem key={i} bottomDivider  containerStyle={styles.listItemContainer}>
                        <ListItem.Content style={{ flex: 1 }}>
                            <Text style={styles.playerName}>Nimi: {game.player1}</Text>
                            <Text style={styles.playerScore}>Voitot: {game.player1Score}</Text>
                        </ListItem.Content>
                        <ListItem.Content style={{ flex: 1 }}>
                            <Text style={styles.playerName}>Nimi: {game.player2}</Text>
                            <Text style={styles.playerScore}>Voitot: {game.player2Score}</Text>
                        </ListItem.Content>
                         </ListItem>
                    })}
                </View>
            </>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: 350
      },
      listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '90%',
      },
      playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      playerScore: {
        fontSize: 16,
        color: '#333',
      },
      title: {
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'transparent'
      },
});

export default Scores;