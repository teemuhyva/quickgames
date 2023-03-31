/* eslint-disable prettier/prettier */
import { Avatar } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { NewPlayer } from '../../App';
import { CurrentGame } from '../../interfaces/interfaces';

type CurrentGameProps = {
    inGamePlayers: NewPlayer[]
}

const OnGoingGame = (players: CurrentGameProps) => {

    const PlayerCard = (player1: any, player2: any) => {
        return (
            <>
            <View style={styles.containerView}>
                <View style={styles.cardContainer}>
                    <Card>
                        <Card.Title>Pelaaja 1</Card.Title>
                        <Card.Divider />
                        <View>
                            <ListItem>
                                <Avatar 
                                    rounded 
                                    icon={{
                                        name: 'person-outline', 
                                        type: 'material', 
                                        size: 26}}
                                    containerStyle={{ backgroundColor: '#c2c2c2'}}/>
                                <ListItem.Content>
                                    <ListItem.Title>{player1.playerName || "TBD"}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    </Card>
                </View>
                <View style={styles.cardContainer}>
                    <Card>
                        <Card.Title>Pelaaja 2</Card.Title>
                        <Card.Divider />
                        <View>
                            <ListItem>
                                <Avatar 
                                    rounded 
                                    icon={{
                                        name: 'person-outline', 
                                        type: 'material', 
                                        size: 26}}
                                    containerStyle={{ backgroundColor: '#c2c2c2'}}/>
                                <ListItem.Content>
                                    <ListItem.Title>{player2.playerName || "TBD"}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    </Card>
                </View>
            </View>
            <Divider style={styles.divider}/>
            </>
        )
    }

    return (
        <>
            {!players.inGamePlayers.length ?
                <PlayerCard /> :
                players.inGamePlayers.length === 1 ?
                <PlayerCard player1={players.inGamePlayers[0]} player2="TBD"/> :
                <PlayerCard player1={players.inGamePlayers[0]} layer1={players.inGamePlayers[2]}/>
            
            }
        </>
    )
};

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row',
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    cardContainer: {
        flex: 1
    },
    divider: {
        width: 20,
        color: 'red',
        padding: 10
    }
});

export default OnGoingGame;
