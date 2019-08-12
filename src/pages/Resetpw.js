import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';


export default class Resetpw extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Reset Password',
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
            headerRight: null,
            headerStyle: {
                backgroundColor: '#e91c1a',
            },
            headerTintColor: '#fff',
        };
    };

    constructor() {
        super();
        this.state = {
            dataSource: [],
            token: '',
            oldpass: '',
            pass: "",
            confirmpass: "",
            error: 0,
        }
        //this.GetUserData();
    }

    updateValue(text, field) {
        passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (field == 'oldpass') {
            if (passreg.test(text)) {
                this.setState({
                    oldpass: text,
                    error: 0,

                })
            }
            else {
                console.log('inavlid old password');
                this.setState({ errmsg: 'Enter Minimum eight characters, at least one letter and one number !', error: 1, oldpassVal: false, })
            }
        }
        else if (field == 'pass') {
            if (passreg.test(text)) {
                this.setState({
                    pass: text,
                    error: 0,
                })
            }
            else {
                console.log('inavlid password');
                this.setState({ errmsg: 'Enter Minimum eight characters, at least one letter and one number !', error: 1, passVal: false, })
            }
        }
        else if (field == 'cpass') {
            if (this.state.pass == text) {
                this.setState({
                    confirmpass: text,
                    error: 0,
                })
            }
            else {
                console.log('password mismatch');
                this.setState({ errmsg: 'Password doesnt match !', error: 1, cpassVal: false, })
            }
        }
    }

    onPressButton = () => {
        if (this.state.error == 0) {
            //& update the data in api
            this.resetPass();
        }
        else {
            alert(this.state.errmsg);
        }
    }

    async resetPass() {
        const oldPass = this.state.oldpass;
        const pass = this.state.pass;
        const confirmPass = this.state.confirmpass;
        const token = await AsyncStorage.getItem("@user_at");

        console.log(' ' + oldPass + ' ' + pass + ' ' + confirmPass + ' ' + token);

        const fetchConfig = {
            method: "POST",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `old_password=${oldPass}&password=${pass}&confirm_password=${confirmPass}`
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/users/change`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ dataSource: responseJson }, function () { }),
                    this.Prompt();
            })
            .catch(error => {
                console.error(error);
            });
    }

    Prompt() {
        if (this.state.dataSource.status == 200) {
            alert("" + this.state.dataSource.user_msg);
            this.props.navigation.navigate('LogOut')
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

                <View style={styles.LoginForm}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Current Password"
                        secureTextEntry={true}
                        placeholderTextColor='#ffffff'
                        onChangeText={(text) => this.updateValue(text, 'oldpass')}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="New Password"
                        secureTextEntry={true}
                        placeholderTextColor='#ffffff'
                        onChangeText={(text) => this.updateValue(text, 'pass')}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        placeholderTextColor='#ffffff'
                        onChangeText={(text) => this.updateValue(text, 'cpass')}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.onPressButton()}>
                        <Text style={styles.Textbutton}>Reset Password</Text>
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
        marginTop: 100,
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