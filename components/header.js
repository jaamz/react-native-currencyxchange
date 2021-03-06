import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';

const Header = props => {

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.font}>
                    Trex
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
        backgroundColor:'#24B724',
        paddingTop:35,
        paddingBottom:20,

    },
    font: {
        fontWeight: 'bold',
        fontSize:18,
        color:'white'

    }
})