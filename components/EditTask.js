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


class EditTask extends Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: '#f8d368' },
        title: 'Time Tracker App',
    };

    constructor(props) {
        super(props);

        this.state = {
            taskId: '',
            projectId: '',
            title: '',
            time: '',
            isRunning: false,
            userId: '',
            projects: [],
            dataId: [],
        }
    }

    async componentDidMount() {
        const getId = this.props.navigation.getParam('dataId', 'NO-ID');
        this.setState({
            userId: getId[0],
            projectId: getId[1],
            taskId: getId[2],
        })
        try {
            let responseTask = await fetch('http://192.168.1.68:3000/api/v1/users/' + getId[0] + '/projects/' + getId[1] + '/tasks/' + getId[2]);
            let resTask = JSON.parse(responseTask._bodyInit);
            if (resTask != 422) {
                this.setState({
                    title: resTask.title,
                    time: resTask.time,
                });
            } else {
                //Handle error
                Alert.alert("Error", "Try Again, please");
            }
            console.log(this.state.time);
            let responseProject = await fetch('http://192.168.1.68:3000/api/v1/users/' + getId[0] + '/projects/');
            let resProject = JSON.parse(responseProject._bodyInit);
            if (resProject != 422) {
                this.setState({
                    projects: resProject,
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

    async onPressUpdateTaskButton() {
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + this.state.userId + '/projects/' + this.state.projectId + '/tasks/'+this.state.taskId, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: {
                        title: this.state.title,
                        time: this.state.time,
                        is_running: false,
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
                            onChangeText={title => this.setState({ title })}
                            value={this.state.title}
                            underlineColorAndroid='transparent'
                            placeholder="Login"
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
                        onPress={this.onPressUpdateTaskButton.bind(this)}
                        title="Update task"
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

export default EditTask;