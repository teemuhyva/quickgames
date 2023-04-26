/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import type { ReactNode } from 'react';
import React from 'react';
import BottomTabs from './src/Navigator/TabNavigator';
//import { RealmContext } from './src/models/RealmConfig';
import RealmContext from '../Quicktournament/src/models/RealmConfig'

const { RealmProvider } = RealmContext;

const App: () => ReactNode = () => {

  return (
    
      <NavigationContainer>
        <RealmProvider>
          <BottomTabs />
        </RealmProvider>
      </NavigationContainer>    
  )
}

export default App;

