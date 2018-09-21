import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';

const Header = props => {

    return (
        <View>
            <View
                style={styles.container}>
                    
                <Text
                style={styles.font}>
                    Currency
                </Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'green',
        backgroundColor:'green',
        borderWidth:5,
        paddingTop:20,
        paddingBottom:20,

    },
    font: {
        fontWeight: 'bold',
        fontSize:22,
        color:'white'

    }
})