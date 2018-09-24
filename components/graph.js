import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';


class Graph extends React.PureComponent {
    state = {
        currency1: 'USD',
        currency2: 'CAD',
        days: '30',
        yAxis: [],
        xAxis: [],
    }


    componentDidMount() {
        this.grabData()
    }

    // API information load that will determine the X/Y Axis data points
    grabData = currency => {
        axios.get(`http://localhost:3000/${this.state.currency1}?duration=${this.state.days}&target=${this.state.currency2}`)
            .then(res => {
                this.setState({
                    xAxis: res.data.map(x => x.date),
                    yAxis: res.data.map(x => x[this.state.currency2])
                })
            })
    }

    onChangeDrop = currency => {
        this.setState({
            currency2: currency
        }, () => {
            this.grabData(currency)
        })
    }

    onChangeDrop2 = currency => {
        this.setState({
            currency1: currency
        }, () => {
            this.grabData(currency)
        })
    }
    // Ex. 1 Day Button ( () => this.changeAmountOfDays(1))
    // Ex. 7 Days Button ( () => this.changeAmountOfDays(7))
    // Ex. 30 Days Button ( () => this.changeAmountOfDays(30))
    changeAmountOfDays = days => {
        this.setState({
            days
        }, () => {
            this.grabData(days)
        })
    }

    render() {

        return (

            <View>
                <View style={styles.container}>
                    <Dropdown
                        containerStyle={styles.dropDownStyle}
                        label='Main Currency'
                        data={dropDownSelection}
                        onChangeText={this.onChangeDrop2}
                        value={this.state.currency1}
                    />
                    <Text
                    style={styles.inBetween}>
                    ⇄
                    </Text>
                    <Dropdown
                        containerStyle={styles.dropDownStyle}
                        label='Currency Compared'
                        data={dropDownSelection}
                        onChangeText={this.onChangeDrop}
                        value={this.state.currency2}
                    />
                </View>
                <View>
                    <LineChart
                        data={{
                            datasets: [{
                                data: this.state.yAxis,
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={420}
                        chartConfig={{
                            backgroundColor: '#FFFFFF',
                            backgroundGradientFrom: '#FFFFFF',
                            backgroundGradientTo: '#E1F9E1',
                            color: (opacity = 1) => `rgba(0, 4, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                    />
                </View>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => { this.changeAmountOfDays(7) }}>
                        <Text
                        style={{color:'white'}}>Week</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => { this.changeAmountOfDays(30) }}>
                        <Text
                        style={{color:'white'}}>Month</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => { this.changeAmountOfDays(180) }}>
                        <Text
                        style={{color:'white'}}>6 Months</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => { this.changeAmountOfDays(365) }}>
                        <Text
                        style={{color:'white'}}>Year</Text>
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
        justifyContent: 'space-evenly',

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
        // paddingTop: 5,

    },
    buttonStyle: {
        // backgroundColor: '#24B724',
        width: 80,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#24B724',
        backgroundColor:'#24B724'   
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
    },
    inBetween:{
        paddingTop:30,
        // fontSize: 20,
    }
});

