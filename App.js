import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import LineChartExample from './components/linechart'

export default class App extends React.Component {
  render() {
    
    return (
      <View style={styles.container}>
      
      <LineChartExample />
      </View>
    );





  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
