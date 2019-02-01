import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert
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
            title: '',
            userId:'',
            errorMessage: null
        }
    }

    async onPressCreateProjectButton() {
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users/'+this.state.userId+'/projects/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project: {
                        title: this.state.title,
                        user_id: this.state.userId,
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

    async componentDidMount(){
        const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
        this.setState({
            userId: getUserId,
        })
    }

    render() {

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleForm}>New Project</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.titleInput}>PROJECT NAME</Text>
                    <View style={styles.inputContainer}>
                    <Ionicons name="md-clipboard" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={title => this.setState({ title })}
                            value={this.state.title}
                            underlineColorAndroid='transparent'
                            placeholder="Prueba OfferApp"
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <Button
                        onPress={this.onPressCreateProjectButton.bind(this)}
                        title="Create project"
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