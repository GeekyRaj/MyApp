import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import Logo from '../components/Logo';

export default class Login extends Component {
    static navigationOptions = {
        title: 'SignUp',
        header: null,
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor() {
        super();
        this.state = {
            username: ' ',
            password: ' '
        }
    }

    updateValue(text, field) {
        if (field == 'username') {
            this.setState({
                username: text,
            })
        }
        else if (field == 'password') {
            this.setState({
                password: text,
            })
        }
    }

    submit() {
        let collection = {}
        collection.username = this.state.username,
            collection.password = this.state.password
        console.log(collection);

        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login', {
            method: 'POST',
            headers: {

                'access_token': "5d2eb4b6ca059",
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
                `email=${collection.username}&password=${collection.password}`
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                const msg = responseJson.user_msg
                const status = responseJson.status
                if (status == 200) {
                    this.props.navigation.navigate('Dashboard')
                }
                else {
                    alert(msg)
                }

            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <View style={styles.LoginForm}>
                    <View style={styles.SectionStyle}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-person"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Username"
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'username')}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-lock"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'password')}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
                        <Text style={styles.Textbutton}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgetpw')}>
                        <Text style={{ fontSize: 16, color: '#ffffff' }}> Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>DONT HAVE AN ACCOUNT?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.signupButton}> SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e91C1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginForm: {
        marginVertical: 20,
        flexGrow: 1,
        alignItems: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 60,
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
    },
    inputBox: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    Textbutton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#E91c1a',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    }
});