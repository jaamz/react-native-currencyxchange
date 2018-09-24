import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

// load page where main currency exchange is being done

class Mainpage extends Component {
    state = {
        currency: "USD",
        currencyCompared: "JPY",
        moneyValue: "1",
        results: [],
        convertedAmount: 0,
        calculation: 1,

    }
// API data to load on mount
    componentDidMount() {
        this.getData()
    }

    // setting state with API call
    getData = (callback) => {
        axios.get(`http://localhost:3000/${this.state.currency}?duration=1&target=${this.state.currencyCompared}`)
            .then(res => {
                this.setState({
                    convertedAmount: res.data[0][this.state.currencyCompared]
                }, callback)
            })
    }

    // button press function to call the API 
    // will refresh with new information if different drop down is selected to update state with new information
    buttonPress = () => {
        this.getData(() => {

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
            this.setState({
                results: [...this.state.results, tempObj]
            });
        })
    }

    render() {
        let { container, dropDownStyle, buttonStyle, textInput } = styles;
        return (
            <ScrollView>
                <View style={container}>
                    <Dropdown
                        containerStyle={dropDownStyle}
                        label='Main Currency'
                        data={dropDownSelection}
                        onChangeText={text => { this.setState({ currency: text }) }}
                        value={this.state.currency}
                    />
                    <Text
                        style={styles.inBetween}>
                        ⇄
                    </Text>
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
                        style={styles.buttonStyle}
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
                                <View
                                    style={{ width: 50 }}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Amount"
                                        value={this.state['calculation-' + i]}
                                        onChangeText={text => { this.setState({ ['calculation-' + i]: text }) }}
                                    />
                                </View>

                                {/* ternary statement to render submitted  */}
                                <View
                                    style={styles.calculationStyle}>
                                    {
                                        this.state['calculation-' + i]
                                            ?
                                            <View
                                            style={{flexDirection:'column', alignItems:'center'}}>
                                                <Text
                                                style={{color:'white', fontSize:16}}>
                                                    {(this.state['calculation-' + i] * item.base.amount).toFixed(2)} {item.base.symbol}
                                                </Text>
                                                <Text
                                                style={{color:'white', fontSize:16}}>
                                                    =
                                                </Text>
                                                <Text
                                                style={{color:'white', fontSize:16}}>
                                                    {(this.state['calculation-' + i] * item.converted.amount).toFixed(2)} {item.converted.symbol}
                                                </Text>
                                            </View>
                                            :   
                                            <View
                                            style={{flexDirection:'column', alignItems:'center'}}>
                                                <Text
                                                style={{color:'white', fontSize:16}}>{item.base.symbol}</Text>
                                                <Text
                                                style={{color:'white', fontSize:16}}>=</Text>
                                                <Text
                                                style={{color:'white', fontSize:16}}> {item.converted.symbol}</Text>
                                            </View>

                                    }
                                </View>

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
        width: 100,
        height: 35,
        textAlign: 'center',
        justifyContent: 'flex-start',
        marginLeft: 5,
        color:'white',
        fontSize:18

    },
    dropDownStyle: {
        width: 120,

    },
    buttonStyle: {
        width: 30,
        height: 30,
        marginBottom: 10,
        borderWidth: .75,
        borderColor: '#24B724',
        borderRadius:6

    },
    mapStyle: {
        height: 80,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        marginBottom: 10,
        backgroundColor:'#24B724',

    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inBetween: {
        paddingTop: 30,
    },
    calculationStyle: {
        justifyContent: 'center',
        height: 50,
        width: 300,
        alignItems: 'center',
        flexDirection: 'column',
    },
    blockMap: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    }

});


