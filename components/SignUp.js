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
        headerStyle: {
            backgroundColor: '#f8d368',
        },
        title: 'Time Tracker App',
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            password: '',
            password_confirmation: '',
        }
    }

    async onPressSignUpButton() {
        try {
            let response = await fetch('http://192.168.1.68:3000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        name: this.state.name,
                        username: this.state.username,
                        password: this.state.password,
                        password_confirmation: this.state.password_confirmation,
                    }
                })
            });
            if (response.status >= 200 && response.status < 300) {
                this.props.navigation.navigate('LoginScreen')
            } else {
                //Handle error
                Alert.alert("ERROR", response);
            }
        } catch (errors) {
            //Handle error
            console.log(errors);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View>
                    <Text style={styles.titleForm}>Sign Up</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.titleInput}>NAME</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="md-contact" size={30} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ name: text })}
                                underlineColorAndroid='transparent'
                                placeholder="Tatiana Rodríguez"
                                returnKeyType="next"
                                placeholderTextColor="rgba(11,35,51,0.7)"
                            />
                        </View>
                        <Text style={styles.titleInput}>USER</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="md-contact" size={30} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ username: text })}
                                underlineColorAndroid='transparent'
                                placeholder="trodriguez30"
                                returnKeyType="next"
                                autoCapitalize="none"
                                placeholderTextColor="rgba(11,35,51,0.7)"
                            />
                        </View>
                        <Text style={styles.titleInput}>PASSWORD</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="md-key" size={30} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ password: text })}
                                underlineColorAndroid='transparent'
                                placeholder="••••••••••"
                                returnKeyType="go"
                                secureTextEntry
                                placeholderTextColor="rgba(11,35,51,0.7)"
                            />
                        </View>
                        <Text style={styles.titleInput}>PASSWORD CONFIRMATION</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="md-key" size={30} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ password_confirmation: text })}
                                underlineColorAndroid='transparent'
                                placeholder="••••••••••"
                                returnKeyType="go"
                                secureTextEntry
                                placeholderTextColor="rgba(11,35,51,0.7)"
                            />
                        </View>
                    </View>
                    <View style={styles.optionsContainer}>
                        <Button
                            onPress={this.onPressSignUpButton.bind(this)}
                            title="Create Account"
                            color="#0b2333"
                        ></Button>
                    </View>
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
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: '700',
        color: '#0b2333',
    },
    titleInput: {
        paddingVertical: 5,
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