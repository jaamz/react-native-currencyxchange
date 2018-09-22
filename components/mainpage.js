import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';
class Mainpage extends Component {
    state = {
        currency: "USD",
        currencyCompared: "JPY",
        moneyValue: "1",
        results: [],
        convertedAmount: 0,
        calculation: 1,

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
                                style={{width:50}}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="#"
                                    value={this.state['calculation-' + i]}
                                    onChangeText={text => { this.setState({ ['calculation-' + i]: text }) }}
                                />
                                </View>

                                <View
                                style={styles.calculationStyle}>
                                {
                                    this.state['calculation-' + i]
                                        ?
                                        <Text>
                                            {this.state['calculation-' + i] * item.base.amount } {item.base.symbol}
                                          ⇄ {this.state['calculation-' + i] * item.converted.amount } {item.converted.symbol}
                                        </Text>
                                        :
                                        <Text>{item.base.symbol} ⇄ {item.converted.symbol}</Text>

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
        justifyContent:'flex-start',
        // borderColor:'blue',
        // borderWidth:3

    },
    dropDownStyle: {
        width: 120,

    },
    buttonStyle: {
        // borderColor: 'black',
        // borderWidth: .5,
        width: 30,
        height: 30,

    },
    mapStyle: {
        height: 40,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 2,
        // borderColor: 'red'


    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadContainer: {
        paddingBottom: 10,
        alignItems: 'center',
    },
    inBetween: {
        paddingTop: 30,
        // fontSize: 20,
    },
    calculationStyle: {
        justifyContent:'center',
        // borderColor:'grey',
        // borderWidth:3,
        height:35,
        width:300,
        alignItems:'center'
    },
    blockMap: {
        justifyContent:'space-between',
        // backgroundColor:'red',
        flexDirection:'row',

    }

});


