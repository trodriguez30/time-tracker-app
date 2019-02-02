import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class TaskTimer extends Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: '#f8d368' },
        title: 'Task',
    };

    constructor(props) {
        super(props);

        this.state = {
            task: '',
            projectId: '',
            time: '',
            isRunning: false,
            taskId: '',
            projectTitle: '',
            data: [],
        }
    }

    async componentDidMount() {
        const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
        const getProjectId = this.props.navigation.getParam('projectId', 'NO-ID');
        const getTaskId = this.props.navigation.getParam('taskId', 'NO-ID');
        this.setState({
            data: [getUserId, getProjectId, getTaskId],
        })
        try {
            let responseTask = await fetch('http://192.168.1.68:3000/api/v1/users/' + getUserId + '/projects/' + getProjectId + '/tasks/' + getTaskId);
            let resTask = JSON.parse(responseTask._bodyInit);
            if (resTask != 422) {
                this.setState({
                    task: resTask.title,
                    time: resTask.time,
                    isRunning: resTask.is_running,
                    taskId: resTask.id,
                    projectId: resTask.project_id,
                });
            } else {
                //Handle error
                Alert.alert("Error", "Try Again, please");
            }
            let responseProject = await fetch('http://192.168.1.68:3000/api/v1/users/' + getUserId + '/projects/' + getProjectId);
            let resProject = JSON.parse(responseProject._bodyInit);
            if (resProject != 422) {
                this.setState({
                    projectTitle: resProject.title,
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

    async _onPressStartStopTaskButton() {

        let time, s, m, h;
        time = this.state.time.split(':');
        h = time[0];
        m = time[1];
        s = time[2];
        if (this.state.isRunning) {
            clearInterval(this.interval);
            this.setState({
                isRunning: false,
            });
            try {
                let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + this.state.data[0] + '/projects/' + this.state.data[1] + '/tasks/' + this.state.data[2], {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task: {
                            title: this.state.task,
                            time: this.state.time,
                            is_running: false,
                            project_id: this.state.projectId,
                        }
                    })
                });
                let res = response._bodyInit;
                if (res >= 200 && res < 300) {
                    return;
                } else {
                    //Handle error
                    Alert.alert("ERROR", res);
                }
            } catch (errors) {
                //Handle error
                console.log(errors);
            }
        }

        this.setState({
            isRunning: true,
        });

        this.interval = setInterval(() => {
            if (s < 60) {
                s++;
                if (s < 10) {
                    s = "0" + s;
                }
            }
            if (s == 60) {
                s = "0" + 0;
            }
            if (s == 0) {
                m++;
                if (m < 10) {
                    m = "0" + m;
                }
            }
            if (m == 60) {
                m = "0" + 0;
            } if (s == 0 && m == 0) {
                h++;
                if (h < 10) {
                    h = "0" + h;
                }
            }
            this._updateTime(h, m, s)
        }, 1000);
    }

    _updateTime(h, m, s) {
        crono = "" + h + ":" + m + ":" + s + "";
        this.setState({
            time: crono,
        })
    }

    async _onPressDeleteTask() {
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + this.state.data[0] + '/projects/' + this.state.data[1] + '/tasks/' + this.state.data[2], {
                method: 'DELETE',
            });
            let res = JSON.parse(response._bodyInit);
            if (res != 422) {
                Alert.alert("Delete", "successfully deleted task");
                this.props.navigation.goBack();
            } else {
                //Handle error
                Alert.alert("Error", "Try Again, please");
            }
        } catch (errors) {
            //Handle error
            console.log(errors);
        }
    }

    render() {
        let nameButton;
        if (!this.state.isRunning) {
            nameButton = "START";
        } else {
            nameButton = "STOP";
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.titleInput}>TASK</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-checkbox-outline" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={task => this.setState({ task })}
                            value={this.state.task}
                            underlineColorAndroid='transparent'
                            editable={false}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                    <Text style={styles.titleInput}>PROJECT</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-clipboard" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={task => this.setState({ task })}
                            value={this.state.projectTitle}
                            underlineColorAndroid='transparent'
                            editable={false}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                    <Text style={styles.titleInput}>TIME</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-stopwatch" size={30} style={styles.icon} />
                        <TextInput
                            style={[styles.inputText, styles.stopWatch]}
                            onChangeText={task => this.setState({ task })}
                            value={this.state.time}
                            underlineColorAndroid='transparent'
                            editable={false}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                </View>
                <View style={styles.timerContainer}>
                    <TouchableOpacity
                        onPress={this._onPressStartStopTaskButton.bind(this)}
                        style={styles.timerButton}
                    >
                        <Text style={styles.timerText}>{nameButton}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('EditTaskScreen', {dataId: this.state.data})}
                        style={[styles.optionsButton, styles.edit]}
                    >
                        <Text style={styles.optionsText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._onPressDeleteTask.bind(this)}
                        style={[styles.optionsButton, styles.delete]}
                    >
                        <Text style={styles.optionsText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    stopWatch: {
        textAlign: 'center',
        fontSize: 40,
    },
    timerContainer: {
        width: Dimensions.get('window').width,
        paddingVertical: 10,
        flex: 1,
    },
    timerButton: {
        backgroundColor: '#0b2333',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    optionsContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        marginTop: 20,
        flex: 1,
    },
    optionsButton: {
        width: (Dimensions.get('window').width) / 3,
        backgroundColor: '#0b2333',
        height: 40,
        justifyContent: 'center',
    },
    optionsText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    edit: {
        backgroundColor: '#185F00',
    },
    delete: {
        backgroundColor: '#A50701',
    }
});

export default TaskTimer;