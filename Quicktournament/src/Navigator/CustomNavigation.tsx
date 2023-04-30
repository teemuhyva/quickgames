import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Games from "../screens/Games";
import Scores from "../screens/Scores";
import PlayerList from "../components/PlayerList";

const Stack = createStackNavigator();

const GameScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Games" component={Games} options={{ title: "Pelit"}}/>
            <Stack.Screen name="PlayerList" component={PlayerList}  options={{ title: "Pelaajat"}}/>
        </Stack.Navigator>
    )
}

export {GameScreenNavigation};

const ScoreScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Scores" component={Scores} options={{ title: "Tulokset"}}/>
        </Stack.Navigator>
    )
}

export {ScoreScreenNavigation};