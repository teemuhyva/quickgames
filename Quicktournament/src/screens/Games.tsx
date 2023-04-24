import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { currentDate } from "../utils/utils";

const Games = ({navigation}) => {
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