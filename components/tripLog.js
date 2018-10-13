import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Log extends Component {
    state = {
        tripName: 'My Japan Trip',
        countryCurrency: 'JPY',
        myCurrency: 'USD',
        amount: '0',
    }
    render() {
        return (

            <ScrollView>
                <View>
                    {this.state.tripName}
                </View>
            </ScrollView>



        );
    }
}

export default Log;