import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Game } from "../models/Game";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Scores = () => {

    const games: Game[] = useSelector((state: RootState) => state.game.games);
    
    return (
        <View style={styles.container}>
            {games.map((game, i) => (
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
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
});

export default Scores;