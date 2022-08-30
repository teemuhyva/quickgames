/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NewPlayer } from '../../App';
import PlayerCardView from '../swipeaction/SwipeCardView';

type PlayerCardProps = {
    playerWaitingList: NewPlayer[]
}

const PlayerCard = ({ playerWaitingList }: PlayerCardProps) => {

    return (
        <View>
            <FlatList
                data={playerWaitingList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <PlayerCardView
                        player={item}
                        onSwipeLeft={() => alert('some alert')}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default PlayerCard;
