import React from 'react';
import Header from './components/header'
import Transaction from './components/transaction'
import { StyleSheet, Text, View, Picker, PickerItem } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import Graph from './components/graph'
import { Dropdown } from 'react-native-material-dropdown';
import Mainpage from './components/mainpage';
export default class App extends React.Component {
  render() {

    return (
      <View
        style={styles.container}>
        {/* <View>
          <Header />
        </View> */}
        {/* <Graph /> */}
         <Mainpage />
        {/* <Transaction /> */}
      </View>
    );





  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: ' flex-start',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
});
