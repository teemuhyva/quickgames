/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import type { ReactNode } from 'react';
import React from 'react';
import BottomTabs from './src/Navigator/TabNavigator';

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
        <BottomTabs />
    </NavigationContainer>
  )
}

export default App;

