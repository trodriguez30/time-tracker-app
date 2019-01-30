import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    TextInput,
    Dimensions,
    Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class SignUp extends Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: '#f8d368' },
        title: 'Time Tracker App',
    };

    constructor(props) {
        super(props);

        this.state = {
            task: '',
            project: '',
            errorMessage: null
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleForm}>New Task</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.titleInput}>TASK</Text>
                    <View style={styles.inputContainer}>
                    <Ionicons name="md-checkbox-outline" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={task => this.setState({ task })}
                            value={this.state.task}
                            underlineColorAndroid='transparent'
                            placeholder="Login"
                            returnKeyType="next"
                            onSubmitEditing={() => this.projectInput.focus()}
                            ref={(input) => this.taskInput = input}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                    <Text style={styles.titleInput}>PROJECT</Text>
                    <View style={styles.inputContainer}>
                    <Ionicons name="md-clipboard" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={project => this.setState({ project })}
                            value={this.state.project}
                            underlineColorAndroid='transparent'
                            placeholder="Prueba Offerapp"
                            returnKeyType="next"
                            ref={(input) => this.projectInput = input}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('PrincipalScreen')}
                        title="Create task"
                        color="#0b2333"
                    ></Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    titleForm: {
        paddingVertical: 20,
        fontSize: 25,
        fontWeight: '700',
        color: '#0b2333',
    },
    titleInput: {
        paddingVertical: 10,
        fontWeight: '500',
        color: '#0b2333',
    },
    icon: {
        position: 'absolute',
        left: 9,
        top: 9,
    },
    inputText: {
        height: 40,
        paddingLeft: 40,
        backgroundColor: 'rgba(255,255,255,0.20)',
        marginBottom: 10,
        color: '#0b2333',
        paddingHorizontal: 10,
        fontSize: 15,
    },
    optionsContainer: {
        paddingVertical: 20,
    }
});

export default SignUp;