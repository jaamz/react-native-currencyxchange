import React from 'react';
import { TabNavigator } from 'react-navigation';
import Mainpage from './components/mainpage';
import LineChartExample from './components/linechart';
import Transaction from './components/transaction';
// returning undefined
export const Tab = 
    TabNavigator({
    Currency: {
        screen: Mainpage,
    },
    Graph: {
        screen: LineChartExample,
    },
    Transactions: {
        screen: Transaction,
    }
}, {
        tabBarPosition:'bottom',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#f2f2f2',
            activeBackgroundColor:'#2EC4B6',
            inactiveTintColor:'#666',
            labelStyle: {
                fontSize: 22,
                padding: 12
            }
        }
    });


