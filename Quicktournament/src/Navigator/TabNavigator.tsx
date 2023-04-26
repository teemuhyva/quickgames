import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@rneui/themed';
import React from 'react';
import Scores from '../screens/Scores';
import { GameScreenNavigation } from './CustomNavigation';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName: any;

          if (route.name === 'Pelit') {
            iconName = 'search';
          } else if (route.name === 'Sijoitukset') {
            iconName = 'info';
          }

          return <Icon name={iconName} />;
        },
      })}>
        <Tab.Screen name="Pelit" component={GameScreenNavigation} />
        <Tab.Screen name='Sijoitukset' component={Scores} />
      </Tab.Navigator>
    );
  }