/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { ReactNode } from 'react';
import React from 'react';
import { AppRegistry } from 'react-native';
import Games from './screens/Games';
import HomePage from './screens/Home';
import RegisterPlayer from './screens/RegisterPlayer';
import WaitingListBilliard from './screens/WaitingListBilliard';
import WaitingListSnooker from './screens/WaitingListSnooker';

//https://reactnavigation.org/docs/drawer-navigator/
//babel what it means 
//Appregistry.registerComponent
const Drawer = createDrawerNavigator();

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='home'>
        <Drawer.Screen name='Koti' component={HomePage} />
        <Drawer.Screen name="Menossa olevat pelit" component={Games} />
        <Drawer.Screen name='Rekisteröinti' component={RegisterPlayer} />
        <Drawer.Screen name='Biljardi pelaajalista' component={WaitingListBilliard} />
        <Drawer.Screen name='Snooker pelaajalista' component={WaitingListSnooker} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

