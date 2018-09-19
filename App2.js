import React from 'react';
import { Tab } from 'react-navigation';
import { StyleSheet, Text, View, Picker, PickerItem } from 'react-native';

import Mainpage from './components/mainpage';
import LineChartExample from './components/linechart';
import Transaction from './components/transaction';

console.log("Tab is:", Tab)
const App = () => {
    return (
        <View>
            <Mainpage />
        </View>
    )
    // <Text>Hello</Text>
}

export default App;