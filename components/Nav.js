import React, { Component } from 'react';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#f8d368',
    },
    navBar: {
        backgroundColor: '#f8d368',
    },
    title: {
        fontSize: 20,
        color: '#0b2333',
    },
    buttonText: {
        color: '#0b2333',
    },
})

class Nav extends Component {
    render() {
        return (
            <NavBar style={styles}>
                <NavTitle style={styles.title}>
                <Ionicons name="md-alarm" size={30} />
                    {" Time Tracker"}
                </NavTitle>
                <NavGroup>
                    <NavButton
                        onPress={() => this.props.navigation.navigate('TabsScreen')}
                    >
                        <NavButtonText style={styles.buttonText}>
                            <Ionicons name="md-exit" size={40} />
                        </NavButtonText>
                    </NavButton>
                </NavGroup>
            </NavBar>
        )
    }
}

export default Nav;