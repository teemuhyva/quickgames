import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from 'react-native-paper'
import { ListItem } from 'react-native-elements'
import { Player } from "../../App";

type PlayerCardProps = {
    playerList: Player[]
}

const PlayerCard = ({ playerList }: PlayerCardProps) => {

    return (
        <FlatList
            data={playerList}
            renderItem={({ item }) => (
                <Card>
                    <Card.Content>
                        <View style={styles.row}>
                            <Text>{item.player1}</Text>
                            <Text>{item.player2}</Text>
                        </View>
                    </Card.Content>
                </Card>
            )}
        />
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginBottom: 20
    }
});

export default PlayerCard