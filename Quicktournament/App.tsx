/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import type { ReactNode } from 'react';
import React from 'react';
import BottomTabs from './src/Navigator/TabNavigator';
import { store } from './store/store';
import { Provider } from "react-redux";
import RealmContext from './src/Realm/RealmConfig'

const { RealmProvider } = RealmContext;

const App: () => ReactNode = () => {

  return (
      <NavigationContainer>
        <Provider store={store}>
          <RealmProvider>
            <BottomTabs />
          </RealmProvider>
        </Provider>
      </NavigationContainer>    
  )
}

export default App;

