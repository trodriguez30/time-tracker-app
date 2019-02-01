import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class Principal extends React.Component {

    render() {
        const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('NewTaskScreen', {userId: getUserId})}
                style={styles.touch}>
                <Ionicons name="md-add" size={50} color='white' />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touch: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b2333',
    }
})

export default Principal;