/* eslint-disable prettier/prettier */
import { Avatar } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { CurrentGame, NewPlayer } from '../../interfaces/interfaces';

type CurrentGameProps = {
    players: NewPlayer[]
}

const OnGoingGame = (props: CurrentGameProps) => {

    const PlayerCard = (players: any) => {

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
                                    <ListItem.Title>{players.players && players.players.length > 0 && players.players[0].playerName ||"TBD"}</ListItem.Title>
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
                                    <ListItem.Title>{players.players && players.players.length > 1 && players.players[1].playerName || "TBD"}</ListItem.Title>
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
            {!props.players.length ?
                <PlayerCard /> :
                <PlayerCard players={props.players}/>
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
