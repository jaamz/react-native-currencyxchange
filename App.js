import React from 'react';

import { createStackNavigator } from 'react-navigation';

import Mainpage from './components/mainpage';
import LineChartExample from './components/linechart';
import Transaction from './components/transaction';

const RootStack = createStackNavigator(
    {
        home: Mainpage,
        chart: LineChartExample,
        transactions: Transaction,
    },
    {
        initialRouteName: 'home'
    }
)

const App = () => (
    <RootStack />
)

export default App;