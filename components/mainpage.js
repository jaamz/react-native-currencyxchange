import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
class Mainpage extends Component {
    state = {
        currency: "USD",
        currencyCompared: "JPY",
        moneyValue: "1",
        results: [],
        convertedAmount: 0,
        calculation:1,

    }

    componentDidMount() {
        this.getData()
    }

    getData = (callback) => {
        axios.get(`http://localhost:3000/${this.state.currency}?duration=1&target=${this.state.currencyCompared}`)
            .then(res => {
                this.setState({
                    convertedAmount: res.data[0][this.state.currencyCompared]
                }, callback)
            })
    }

    buttonPress = () => {
        this.getData(() => {

            // console.log(this.state.moneyValue + this.state.currency + this.state.currencyCompared)
            let tempObj = {
                base: {
                    amount: 1,
                    symbol: this.state.currency,
                },
                converted: {
                    amount: this.state.convertedAmount,
                    symbol: this.state.currencyCompared
                }
            };
            // console.log(this.state.data)
            this.setState({
                results: [...this.state.results, tempObj]
            });
        })
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
                        iconName='add-circle'>
                        <Icon
                            name='add'
                            color='#83f67d'
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    {
                        !!this.state.results &&
                        this.state.results.map((item, i) => (
                            <View
                                key={i}
                                style={styles.mapStyle}>
                                <TextInput 
                                style={styles.textInput}
                                value={this.state['calculation-'+i]}
                                onChangeText={text => {this.setState({['calculation-'+i]: text})}}
                                />
                                {/* <TextInput 
                                style={styles.textInput}
                                value={this.state.calculation}
                                onChangeText={text => {this.setState({calculation: text})}}
                                /> */}


                                {/* <Text>{item.base.amount} {item.base.symbol} - {item.converted.amount} {item.converted.symbol}</Text> */}
                                { 
                                    this.state['calculation-'+i] 
                                    ? 
                                        <Text>{this.state['calculation-'+i]*item.base.amount} {item.base.symbol} 
                                            - {this.state['calculation-'+i]*item.converted.amount} {item.converted.symbol}</Text>
                                    :
                                        <Text>{item.base.symbol} - {item.converted.symbol}</Text>

                                }
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
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadContainer:{
        paddingBottom: 10,
        alignItems:'center',
    }
    
});


