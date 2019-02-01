import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert,
    Picker,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class NewTask extends Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: '#f8d368' },
        title: 'Time Tracker App',
    };

    constructor(props) {
        super(props);

        this.state = {
            task: '',
            projectId: '',
            time: '00:00:00',
            isRunning: false,
            userId: '',
            projects: [],
            errorMessage: null
        }
    }

    async componentDidMount() {
        const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
        this.setState({
            userId: getUserId,
        })
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + getUserId + '/projects/');
            let res = JSON.parse(response._bodyInit);
            if (res != 422) {
                this.setState({
                    projects: res,
                });
            } else {
                //Handle error
                Alert.alert("Error", "Try Again, please");
            }
        } catch (errors) {
            //Handle error
            console.log(errors);
        }
    }

    async onPressCreateTaskButton() {
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + this.state.userId + '/projects/'+this.state.projectId+'/tasks/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: {
                        title: this.state.task,
                        time: this.state.time,
                        is_running: this.state.isRunning,
                        project_id: this.state.projectId,
                    }
                })
            });
            let res = response._bodyInit;
            if (res >= 200 && res < 300) {
                this.props.navigation.navigate('PrincipalScreen')
            } else {
                //Handle error
                Alert.alert("ERROR", res);
            }
        } catch (errors) {
            //Handle error
            console.log(errors);
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
                    <Picker
                        selectedValue={this.state.projectId}
                        onValueChange={(itemValue, itemIndex) => this.setState({ projectId: itemValue })}>
                        <Picker.Item label="Project..." value="" />
                        {this.state.projects.map((item, index) => {
                            return (< Picker.Item label={item.title} value={item.id} key={index} />);

                        })}
                    </Picker>
                </View>
                <View style={styles.optionsContainer}>
                    <Button
                        onPress={this.onPressCreateTaskButton.bind(this)}
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

export default NewTask;