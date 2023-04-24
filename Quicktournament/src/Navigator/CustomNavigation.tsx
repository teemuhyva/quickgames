import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Games from "../screens/Games";
import PlayerList from "../components/players/PlayerList";
import Scores from "../screens/Scores";

const Stack = createStackNavigator();

const GameScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Games" component={Games}/>
            <Stack.Screen name="PlayerList" component={PlayerList} />
        </Stack.Navigator>
    )
}

export {GameScreenNavigation};

const ScoreScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Scores" component={Scores}/>
        </Stack.Navigator>
    )
}

export {ScoreScreenNavigation};