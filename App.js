import React from 'react';
import { StyleSheet, Text, View, Picker, PickerItem } from 'react-native';
// import { LineChart, Grid } from 'react-native-svg-charts';
import { Dropdown } from 'react-native-material-dropdown';
import { createBottomTabNavigator } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import Header from './components/header'
import Graph from './components/graph'
import Mainpage from './components/mainpage';
import Transaction from './components/transaction';
import { Font } from 'expo';


const TabNavigator = createBottomTabNavigator(
  {
    Home: Mainpage,
    Graph: Graph,
    Log: Transaction
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Graph') {
          iconName = `ios-trending-up${focused ? '' : '-outline'}`;
        } else if (routeName === 'Log') {
          iconName = `ios-paper${focused ? '' : '-outline'}`;
        }


        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  });




const App = () => <View
                    style={{ flex: 1 }}>
                    <Header />
                    <TabNavigator />
                  </View>

export default App;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: ' flex-start',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
});
