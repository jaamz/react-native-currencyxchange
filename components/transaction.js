import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

class Transaction extends Component {
  state = {
    transactionTotal: [],
    defaultCurrency: 'USD',
    selectedCurrency: 'JPY',
    inputValue: '0',
    convertedAmount: 0,
    rate: 0
  }

  componentDidMount() {
    this.getData(this.state.defaultCurrency, this.state.selectedCurrency, (rate) => { console.log("RATE:", rate) });
  }

  getData = (currency, second, callback) => {
    axios.get(`http://localhost:3000/${currency}?duration=1&target=${second}`)
      .then(res => {
        this.setState({
          rate: res.data[0][second]
        }, callback(res.data[0][second]))
      })
  }

  buttonPress = () => {
    console.log("INPUT:", this.state.inputValue)
    this.setState({
      transactionTotal: [
        ...this.state.transactionTotal,
        {
          base: this.state.defaultCurrency,
          conversion: this.state.selectedCurrency,
          base_amount: parseFloat(this.state.inputValue),
          conversion_amount: parseFloat(this.state.inputValue) * this.state.rate
        }
      ]
    });
  }

  baseChange = base => {
    if (this.state.transactionTotal.length > 0) {
      this.getData(this.state.defaultCurrency, base, (rate) => {
        // refresh all the data
        let newTransactions = this.state.transactionTotal.map(x => ({
          ...x,
          base: base,
          base_amount: x.base_amount * rate
        }))
        console.log(newTransactions)
        this.setState({ transactionTotal: newTransactions })
      })
    }
    this.setState({ defaultCurrency: base })
  }


  render() {
    return (
      <View>
        <View
          style={styles.container}>
          <Dropdown
            data={dropDownSelection}
            containerStyle={styles.dropDownStyle}
            label='Spent Currency'
            onChangeText={this.baseChange}
            value={this.state.defaultCurrency} />
          <Text
            style={styles.inBetween}>⇄</Text>
          <Dropdown
            data={dropDownSelection}
            containerStyle={styles.dropDownStyle}
            label='Base Currency'
            onChangeText={text => { this.setState({ selectedCurrency: text }) }}
            value={this.state.selectedCurrency} />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={inputValue => { this.setState({ inputValue }) }}
            placeholder='#'
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.buttonPress}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.transactionTotal}
          extraData={this.state}
          renderItem={({ item }) => (
            <View>
              <Text>{item.base}: {item.base_amount}</Text>
              <Text>{item.conversion}: {item.conversion_amount}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index + ""}
        />
        <View>
          {/* <Text>Total Spent:{this.state.transactionTotal}</Text> */}
          <Text>Converted Total:</Text>
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
  },
  inBetween: {
    paddingTop: 30,
    // fontSize: 20,
  }
});



