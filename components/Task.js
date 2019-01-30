import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Tasks extends React.Component {

    render() {

        const name = 'Task: ' + this.props.name
        const time = 'Time: ' + this.props.time

        return (
            <TouchableOpacity style={styles.container}
            onPress={() => this.props.navigation.navigate('TaskStopwatchScreen')}
            >
                <View style={styles.taskBox}>
                <Ionicons name="ios-checkbox-outline" size={50} style={styles.taskIcon} />
                    <View style={styles.info}>
                        <Text style={styles.title}>{name}</Text>
                        <Text>{time}</Text>
                    </View>
                    <Ionicons name="md-arrow-round-forward" size={30} style={styles.goIcon} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    taskBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    taskIcon: {
        paddingHorizontal: 10,
        width: 60,
        height: 60,
        color: '#0b2333',
        paddingVertical: 5,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    goIcon: {
        alignSelf: 'center',
        marginRight: 10,
        color: '#0b2333',
    }
})

export default Tasks;

