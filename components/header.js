import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = props => {

    return (
        <View>
            <View
                style={styles.container}>
                <TouchableOpacity>
                    <Icon
                        reverse
                        name='person'
                        color='#83f67d'
                    />
                </TouchableOpacity>
                <Text>
                    CurrencyXchange
                </Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})