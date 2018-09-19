import React from 'react';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import axios from'axios';
class Graph extends React.PureComponent {
    state = {
        data:[1, 1.3, 1.5, 1.6, .9, 1.5, 1.3, 1.6],
        currency1:'USD',
        currency2:'JPY',
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


    render() {

        const contentInset = { top: 20, bottom: 20 }

        return (
            <View>
            <View style={{flexDirection:'row'}}>
                <Dropdown
                    containerStyle={styles.dropDownStyle}
                    label='Main Currency'
                    data={dropDownSelection}
                    onChangeText={text => { this.setState({ currency1: text }) }}
                    value={this.state.currency1}
                />

                <Dropdown
                    containerStyle={styles.dropDownStyle}
                    label='Currency Compared'
                    data={dropDownSelection}
                    onChangeText={text => { this.setState({ currency2: text }) }}
                    value={this.state.currency2}
                />    
            </View>
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={this.state.data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={8}
                    formatLabel={value => `${value}$`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={this.state.data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}>
                    <Grid />
                </LineChart>
                </View>
            <View 
            style={{flexDirection: 'row'}}>

                    <TouchableOpacity>
                        <Text>1 Week</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text>1 Month</Text>
                    </TouchableOpacity>

                     <TouchableOpacity>
                        <Text>6 Months</Text>
                    </TouchableOpacity>

                     <TouchableOpacity>
                        <Text>1 Year</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default Graph;

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

