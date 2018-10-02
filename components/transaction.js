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


  // API call data
  getData = (base, target) => {
    return axios.get(`http://localhost:3000/${base}?duration=1&target=${target}`)
      .then(res => new Promise((resolve, reject) => resolve(res.data[0][target])))
  }

  // function for button press
  // calls on API to update after button is pressed
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

  add = (a, b) => {
    a + b
  }

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
        <View
          style={styles.barStyle}>
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={amount => { this.setState({ amount }) }}
              placeholder='Amount'
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.state.baseCurrency === 'USD' ? this.buttonPress : this.secondButtonPress}>
              <Text
                style={{ color: 'white', fontSize: 16, paddingTop: 7 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.state.transactions}
          extraData={this.state}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: 'row', justifyContent:'space-between' }}>
              <View
              style={{height:40}}>
                <Text
                style={{fontSize: 16}}>{item.base_sym}: {(item.base_rate * item.unit).toFixed(2)}</Text>
              </View>
              <View
              style={{height:40}}>
                <Text
                style={{fontSize: 16}}>{item.target_sym}: {(item.target_rate * item.unit).toFixed(2)}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index + ""}
        />
        <View
          style={{ justifyContent: 'flex-end', flexDirection: 'column' }}>
          {/* <Text>Converted Total:{this.state.transactions.length === 0 ? 0 : this.state.transactions.unit.reduce(this.add)  }</Text> */}
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
    width: 100,
    height: 50,
    textAlign: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    marginLeft: 40,
    color: 'white'

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
    borderRadius: 6,

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
    width: 100,
    height: 50,
    marginBottom: 10,
    borderWidth: .75,
    borderColor: '#24B724',
    borderRadius: 6,
    marginRight: 40
  },
  inBetween: {
    paddingTop: 30,
    // fontSize: 20,
  },
  barStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#24B724',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.00,

  }
});



