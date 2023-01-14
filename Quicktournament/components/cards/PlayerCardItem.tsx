/* eslint-disable prettier/prettier */
import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text } from 'react-native';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { NewPlayer } from '../../interfaces/interfaces';

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
        <>
            {playerWaitingList.length < 1 ?
                <Text style={styles.text}>Pelaajia ei löytynyt</Text> :
                <SwipeListView
                    data={playerWaitingList}
                    renderItem={renderItem}
                    leftOpenValue={50}
                />}
        </>
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
        textAlign: 'center',
        marginTop: '50%',
    }
});

export default PlayerCard;
