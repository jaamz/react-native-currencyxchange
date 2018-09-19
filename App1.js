import React from 'react';
import Header from './components/header'
import { StyleSheet, Text, View, Picker, PickerItem } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import LineChartExample from './components/linechart'
import { Dropdown } from 'react-native-material-dropdown';
import Mainpage from './components/mainpage';
export default class App extends React.Component {
  render() {

    return (
      <View
        style={styles.container}>
        <View>
          <Header />
        </View>
        <LineChartExample />
        <Mainpage />
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
