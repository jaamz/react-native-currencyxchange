import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
class Mainpage extends Component {
    state = {
        currency: "USD",
        currencyCompared: "JPY",
        moneyValue: "1",
        comparedCurrency: [],
        data: [],

    }

    componentDidMount() {
        axios.get(`http://localhost:3000/${this.state.currency}?duration=${this.state.moneyValue}`)
            .then(res => {
                // console.log(res.data[0].rates);
                this.setState({
                    data: res.data[0].rates
                })
            })
    }

    buttonPress = () => {
        // console.log(this.state.moneyValue + this.state.currency + this.state.currencyCompared)
        let tempObj = { option1: this.state.currency, option2: this.state.currencyCompared };
        // console.log(this.state.data)
        this.setState({
            comparedCurrency: [...this.state.comparedCurrency, tempObj]
        });

    }


    render() {
        // stretch goal to change USD -> to other value
        let { container, dropDownStyle, buttonStyle, textInput } = styles;
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

                <View
                    style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={this.buttonPress}
                        style={buttonStyle}>
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
                                <Text>{this.state.moneyValue} {item.option1} - {this.state.data[item.option2]} {item.option2}</Text>
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
        borderColor: 'black',
        borderWidth: .5,
        width: 30,
        height: 30,



    },
    mapStyle: {
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});


