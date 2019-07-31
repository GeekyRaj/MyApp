import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Logo from '../components/Logo';
import Form from '../components/form';
import Signup from './Signup';

export default class Forgetpass extends Component {
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
            dataSource: [],
            email: '',
            emailVal: true,
            errmsg: '',
            error: 0,
        }
    }

    updateValue(text, field) {
        mailreg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (field == 'email') {
            if (mailreg.test(text)) {
                this.setState({
                    email: text,
                    emailVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid Email ID');
                this.setState({ errmsg: 'Enter valid email address !', error: 1, emailVal: false, })
            }
        }
    }

    onPressButton = () => {
        if (this.state.error == 0) {
            //& update the data in api
            this.Forgot();
        }
        else {
            alert(this.state.errmsg);
        }
    }

    Forgot() {
        const email = this.state.email;
        const fetchConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${email}`
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/users/forgot`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ dataSource: responseJson }, function () { });
                this.Prompt();
            })
            .catch(error => {
                console.error(error);
            });
    }

    Prompt() {
        const { navigate } = this.props.navigation;
        if (this.state.dataSource.status == 200) {
            alert("Your new password has been sent to your email id.");
        } else if (this.state.dataSource.status == 401) {
            alert("" + this.state.dataSource.user_msg);
        } else if (this.state.dataSource.status == 400) {
            alert("" + this.state.dataSource.user_msg);
        } else {
            alert("Something Went Wrong");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <View style={styles.LoginForm}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Email address"
                        placeholderTextColor='#ffffff'
                        onChangeText={(text) => this.updateValue(text, 'email')}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
                        <Text style={styles.Textbutton}>Change Password</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.signupTextCont}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                        <Text style={styles.signupButton}> Login?</Text>
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
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
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