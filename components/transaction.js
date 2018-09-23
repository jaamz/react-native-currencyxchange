import React, { Component } from 'react';
import { dropDownSelection } from './constant/index';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

class Transaction extends Component {
  state = {
    transactions: [],
    baseCurrency: 'USD',
    targetCurrency: 'JPY',
    amount: '0',
  }

  componentDidMount() {
    // this.getData(this.state.defaultCurrency, this.state.selectedCurrency, (rate) => { console.log("RATE:", rate) });
    // this.getData('JPY')
    //   .then(rate => {
    //     console.log("RATE:", rate);
    //   })
  }

  getData = (base, target) => {
    return axios.get(`http://localhost:3000/${base}?duration=1&target=${target}`)
      .then(res => new Promise((resolve, reject) => resolve(res.data[0][target])))
  }

  buttonPress = () => {
    console.log("INPUT:", this.state.inputValue)
    let { baseCurrency, targetCurrency, amount } = this.state;
    let base_rate;
    let target_rate;
    this.getData('USD', baseCurrency)
      .then(base_rate_data => {
        base_rate = base_rate_data;
        return this.getData('USD', targetCurrency)
      })
      .then(target_rate_data => {
        target_rate = target_rate_data;

        this.setState({
          transactions: [
            ...this.state.transactions,
            {
              unit: parseFloat(amount),
              base_rate,
              target_rate,
              base_sym: baseCurrency,
              target_sym: targetCurrency
            }
          ]
        }, () => { console.log(this.state.transactions) });
      })
  }

  secondButtonPress = () => {
    let { baseCurrency, targetCurrency, amount } = this.state;
    let base_rate;
    let target_rate;

    this.getData(baseCurrency, 'USD')
      .then(conversion => {
        amount = conversion * amount;
        return this.getData('USD', baseCurrency);
      })
      .then(base_rate_data => {
        base_rate = base_rate_data;
        return this.getData('USD', targetCurrency)
      })
      .then(target_rate_data => {
        target_rate = target_rate_data;

        this.setState({
          transactions: [
            ...this.state.transactions,
            {
              unit: parseFloat(amount),
              base_rate,
              target_rate,
              base_sym: baseCurrency,
              target_sym: targetCurrency
            }
          ]
        }, () => { console.log(this.state.transactions) });
      })
  }

  baseChange = baseCurrency => {
    if (this.state.transactions.length > 0) {
      // go through and update all the rates
      this.getData('USD', baseCurrency)
        .then(newBaseRate => {
          this.setState({
            baseCurrency,
            transactions: this.state.transactions.map(x => ({
              ...x,
              base_rate: newBaseRate,
              base_sym: baseCurrency
            }))
          })
        })
    } else {
      this.setState({ baseCurrency })
    }
  }

  // targetChange = targetCurrency => {
  //   if (this.state)
  // }

  render() {
    return (
      <View>
        <View
          style={styles.container}>
          <Dropdown
            data={dropDownSelection}
            containerStyle={styles.dropDownStyle}
            label='Base Currency'
            onChangeText={this.baseChange}
            value={this.state.baseCurrency} />
          <Text
            style={styles.inBetween}>⇄</Text>
          <Dropdown
            data={dropDownSelection}
            containerStyle={styles.dropDownStyle}
            label='Target Currency'
            onChangeText={text => { this.setState({ targetCurrency: text }) }}
            value={this.state.targetCurrency} />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={amount => { this.setState({ amount }) }}
            placeholder='#'
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.state.baseCurrency === 'USD' ? this.buttonPress : this.secondButtonPress}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.transactions}
          extraData={this.state}
          renderItem={({ item }) => (
            <View>
              <Text>{item.base_sym}: {item.base_rate * item.unit}</Text>
              <Text>{item.target_sym}: {item.target_rate * item.unit}</Text>
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



