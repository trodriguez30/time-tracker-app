import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class AddButton extends React.Component {

    render() {
        const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('NewProjectScreen', {userId: getUserId})}
                    style={styles.touch}>
                    <Text style={styles.touchText}>
                        Add Project
                    </Text>
                </TouchableOpacity>
                <View style={styles.div}></View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('NewTaskScreen', {userId: getUserId})}
                    style={styles.touch}>
                    <Text style={styles.touchText}>
                        Add Task
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        flexDirection: 'row',
        width: Dimensions.get("window").width,
    },
    div:{
        width: 6,
        backgroundColor: 'white',
    },
    touch:{
        backgroundColor: '#0b2333',
        height: 60,
        width: (Dimensions.get("window").width/2)-3,
        justifyContent: 'center',
        alignContent: 'center',
    },
    touchText:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '700', 
    }
})

export default AddButton;