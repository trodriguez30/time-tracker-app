import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Principal extends React.Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('NewTaskScreen')}
                style={styles.touch}>
                <Ionicons name="md-add" size={50} color='white' />
                <Text style={styles.touchText}>ADD TASK</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touch: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        backgroundColor: '#0b2333',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchText: {
        marginLeft: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    }
})

export default Principal;