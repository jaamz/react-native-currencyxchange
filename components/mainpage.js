import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';

class Mainpage extends Component {
    state = {
        currency: "USD",
        currencyCompared: "JPY",
        moneyValue: "1",
        comparedCurrency: [],

    }

    buttonPress = () => {
        console.log(this.state.moneyValue + this.state.currency + this.state.currencyCompared)
        let tempObj = { option1: this.state.currency, option2: this.state.currencyCompared };

        this.setState({
            comparedCurrency: [...this.state.comparedCurrency, tempObj]
        });

    }


    render() {

        let { container, dropDownStyle, buttonStyle } = styles;
        return (
            <ScrollView>
                <View style={container}>
                    {/* <TextInput
                    style={textInput}
                    value={this.state.moneyValue}
                    onChangeText={text => { this.setState({ moneyValue: text }) }}
                /> */}
                    <Dropdown
                        containerStyle={dropDownStyle}
                        label='Main Currency'
                        data={dropDownSelection}
                        onChangeText={text => { this.setState({ currency: text }) }}
                        value={this.state.currency}
                    />
                    <Dropdown
                        containerStyle={dropDownStyle}
                        label='Currency Compared'
                        data={dropDownSelection}
                        onChangeText={text => { this.setState({ currencyCompared: text }) }}
                        value={this.state.currencyCompared}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={this.buttonPress}>
                        <Icon
                            name='add'
                            color='#83f67d'
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    {
                        !!this.state.comparedCurrency &&
                        this.state.comparedCurrency.map((item, i) => (
                            <View 
                            key={i}
                            style={styles.mapStyle}>
                                <Text>{item.option1} - {item.option2}</Text>
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        );
    }
}

export default Mainpage;


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
        backgroundColor: '#38F5BE',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle:{
        borderWidth: 1,
        borderColor:'black',
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',


    }
});


