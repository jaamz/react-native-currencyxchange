import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

class Transaction extends Component {
    state = {
        transactionTotal=[],
        defaultCurrency='USD',
        


    }
    render() {
        return (
            <View>
                <View>
                    <Dropdown 
                    data={dropDownSelection}
                    value={this.state.defaultCurrency}/>
                </View>
                <View>
                    <TextInput
                    style={styles.textInput}
                    placeholder='$$$'></TextInput>
                </View>
                <View>
                    <Dropdown 
                    data={dropDownSelection}/>
                </View>
                <View>
                    <TouchableOpacity
                    style={styles.buttonContainer}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Transaction;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    textInput: {
        width: 50,
        height: 30,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'black',

    },
    dropDownStyle: {
        width: 120,

    },
    buttonStyle: {
        borderColor:'black',
        borderWidth: .5,
        width: 30,
        height: 30,

    },
    mapStyle:{
        borderWidth: 1,
        borderColor:'black',
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
    }
});