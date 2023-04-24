import React from "react";
import { Avatar } from "@rneui/base";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";

const OnGoingGame = () => {

    return (
        <View style={styles.ongoingGameContainer}>
            <Card style={styles.cardStyle}>
                <Card.Title>
                    <Avatar rounded 
                            icon={{
                            name: 'person-outline', 
                            type: 'material', 
                            size: 26}}
                            containerStyle={{ backgroundColor: '#c2c2c2'}}/>
                </Card.Title>
                <View style={styles.gameinfoWrapper}>
                    <Text>
                        Pelaaja 1
                    </Text>
                    <Text>
                        1 voittoa
                    </Text>
                </View>
                
            </Card>
            <Card style={styles.cardStyle}>
                <Card.Title>
                    <Avatar rounded 
                            icon={{
                            name: 'person-outline', 
                            type: 'material', 
                            size: 26}}
                            containerStyle={{ backgroundColor: '#c2c2c2'}}/>
            </Card.Title>
                <View style={styles.gameinfoWrapper}>
                    <Text>
                        Pelaaja 2
                    </Text>
                    <Text>
                        0 voittoa
                    </Text>
                </View>                
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    ongoingGameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 240,
        backgroundColor: "#F2E7FE",
        gap: 16
    },
    gameinfoWrapper: {
        flexDirection: 'column',
    },
    cardStyle: {
    }
});

export default OnGoingGame;