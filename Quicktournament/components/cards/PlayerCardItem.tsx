/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, ListRenderItemInfo } from 'react-native';
import { NewPlayer } from '../../App';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { PlayerCardView } from '../swipeaction/SwipeCardView';

type PlayerCardProps = {
    playerWaitingList: NewPlayer[]
}

const PlayerCard = ({ playerWaitingList }: PlayerCardProps) => {

    const renderItem = (data: ListRenderItemInfo<NewPlayer>, rowMap: RowMap<NewPlayer>) => {
        return (
            <PlayerCardView data={data} rowMap={rowMap} />
        );
    };

    return (
        <SwipeListView
            data={playerWaitingList}
            renderItem={renderItem}
            leftOpenValue={50}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        marginBottom: 20,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    }
});

export default PlayerCard;
