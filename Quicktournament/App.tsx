/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type { ReactNode } from 'react';
import React from 'react';
import Games from './screens/Games';
import HomePage from './screens/HomeScreen';
import RegisterPlayer from './screens/RegisterPlayer';
import WaitingListScreen from './screens/WaitingList';

//https://reactnavigation.org/docs/drawer-navigator/
//babel what it means 
//Appregistry.registerComponent
//https://reactnavigation.org/docs/getting-started
const Drawer = createDrawerNavigator();

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Koti">
        <Drawer.Screen name='Koti' component={HomePage} />
        <Drawer.Screen name="Pelit" component={Games} />
        <Drawer.Screen name='Rekisteröinti' component={RegisterPlayer} />
        <Drawer.Screen
          name='Biljardi'
          component={WaitingListScreen}
          initialParams={{ gametype: 'billiard' }} />
        <Drawer.Screen
          name='Snooker'
          component={WaitingListScreen}
          initialParams={{ gametype: 'snooker' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

