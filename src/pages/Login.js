import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
//import AsyncStorage from '@react-native-community/async-storage';

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
            password: ' ',
            //Border for invalid data
            userVal: true,
            passVal: true,
            error: 0,
            errmsg: ' ',
            //Retrieve json data
            dataLogin: [],
            token: '',
            hidePassword: true,
        }
        this.CheckIfAlreadyLogin()
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    async CheckIfAlreadyLogin() {
        const email = await AsyncStorage.getItem("@user_at");
        //const pass = await AsyncStorage.getItem("@user_pass");
        if (email != null) {
            console.log('User data already exist ' + email);
            this.props.navigation.navigate('Dashboard');
        }
    }

    updateValue(text, field) {
        alph = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (field == 'username') {
            if (alph.test(text)) {
                this.setState({
                    username: text,
                    userVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid Username');
                this.setState({ errmsg: 'Enter valid email address / Username !', error: 1, userVal: false, })
            }
        }
        else if (field == 'password') {
            if (passreg.test(text)) {
                this.setState({
                    password: text,
                    passVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid password');
                this.setState({ errmsg: 'Enter Minimum eight characters, at least one letter and one number !', error: 1, passVal: false, })
            }
        }
    }

    submit() {
        let collection = {}
        collection.username = this.state.username,
            collection.password = this.state.password
        console.log(collection);

        if (this.state.error == 0) {
            fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login', {
                method: 'POST',
                headers: {

                    //'access_token': "5d2eb4b6ca059",
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    `email=${collection.username}&password=${collection.password}`
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ dataLogin: responseJson.data, })

                    this.setState({
                        token: this.state.dataLogin.access_token
                    })
                    console.log(this.state.token);

                    const msg = responseJson.user_msg
                    const status = responseJson.status


                    this.saveUserData(
                        "" + this.state.dataLogin.first_name,
                        "" + this.state.dataLogin.last_name,
                        "" + this.state.dataLogin.email,
                        "" + this.state.dataLogin.phone_no,
                        "" + this.state.dataLogin.access_token
                    )


                    if (status == 200) {
                        this.props.navigation.navigate('Dashboard')
                    }
                    else {
                        alert(msg);
                    }
                })
        }
        else {
            alert(this.state.errmsg);
        }


    }

    async saveUserData(value1, value2, value3, value4, value5) {
        const fname = ["@user_fname", value1];
        const lname = ["@user_lname", value2];
        const email = ["@user_email", value3];
        const phoneno = ["@user_phoneno", value4];
        const access_token = ["@user_at", value5];
        try {
            await AsyncStorage.multiSet([fname, lname, email, phoneno, access_token]);
        } catch (e) {
            console.log("Error Saving data" + error);
        }

        console.log("User Login Data Saved.");
    }

    componentDidMount() {
        console.log('----Login Component Did Mounnt----');
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <View style={styles.LoginForm}>
                    <View style={[styles.SectionStyle, !this.state.userVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-person"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Username"
                            placeholderTextColor='#ffffff'
                            autoCapitalize='none'
                            onChangeText={(text) => this.updateValue(text, 'username')}
                        />
                    </View>
                    <View style={[styles.SectionStyle, !this.state.passVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-lock"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Password"
                            underlineColorAndroid= 'transparent'
                            secureTextEntry={this.state.hidePassword}
                            placeholderTextColor='#ffffff'
                            autoCapitalize='none'
                            onChangeText={(text) => this.updateValue(text, 'password')}
                        />
                        <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
                        </TouchableOpacity>
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
        height: 50,
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
        marginVertical: 5,
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
    },
    error: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
 
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});