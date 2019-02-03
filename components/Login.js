import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert
} from 'react-native';
import Logo from "./Logo";
import GLOBAL from '../IpConfig';
import { Ionicons } from '@expo/vector-icons';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: null
        }
    }

    async onPressLogInButton() {
        try {
            let response = await fetch('http://'+GLOBAL.IP+':3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: {
                        username: this.state.username,
                        password: this.state.password,
                    }
                })
            });
            let res = response._bodyInit;
            console.log(res)
            if (res != 422) {
                this.userInput.clear()
                this.passwordInput.clear()
                this.props.navigation.navigate('PrincipalScreen', {userId: res});
            } else {
                //Handle error
                Alert.alert("ERROR", "Invalid email/password combination");
            }
        } catch (errors) {
            //Handle error
            console.log(errors);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Logo />
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-contact" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                            underlineColorAndroid='transparent'
                            placeholder="User"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            ref={(input) => this.userInput = input}
                            placeholderTextColor="rgba(11,35,51,0.7)"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                    <Ionicons name="md-key" size={30} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            underlineColorAndroid='transparent'
                            placeholder="Password"
                            returnKeyType="go"
                            secureTextEntry
                            placeholderTextColor="rgba(11,35,51,0.7)"
                            ref={(input) => this.passwordInput = input}
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <Button
                        onPress={ this.onPressLogInButton.bind(this) }
                        title="LOG-IN"
                        color="#0b2333"
                    ></Button>
                    <Button
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}
                        title="Create Account"
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
        backgroundColor: '#f8d368',
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    icon: {
        position: 'absolute',
        left: 9,
        top: 9,
        color: '#0b2333',
    },
    inputText: {
        height: 40,
        paddingLeft: 40,
        backgroundColor: 'rgba(255,255,255,0.20)',
        marginBottom: 20,
        color: '#0b2333',
        paddingHorizontal: 10,
        fontSize: 15,
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
});


export default Login;