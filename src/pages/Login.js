import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import style from '../Styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Logo from '../components/Logo';
import CartContext from '../context/CartContext';
import API from '../components/API';
import { SafeAreaView } from 'react-navigation';

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
        drawerLockMode: 'locked-closed'
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
            isLoading: true
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
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


    submit(ContextVal) {
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
                    //console.log(responseJson)
                    this.setState({ dataLogin: responseJson.data, })

                    this.setState({
                        token: this.state.dataLogin.access_token
                    })
                    //console.log(this.state.token);

                    const msg = responseJson.user_msg
                    const status = responseJson.status


                    this.saveUserData(
                        "" + this.state.dataLogin.first_name,
                        "" + this.state.dataLogin.last_name,
                        "" + this.state.dataLogin.email,
                        "" + this.state.dataLogin.phone_no,
                        "" + this.state.dataLogin.access_token,
                    )


                    if (status == 200) {
                        this.props.navigation.navigate('Dashboard');
                        ContextVal.getUpdate();
                        //Set initial cart count from API
                        // const method = 'GET';
                        // const url = 'users/getUserData';
                        // return API(url, method, null)
                        //     .then(responseJson => {
                        //         if (responseJson.status == 200) {
                        //             console.log('COUNT : ' + responseJson.data.total_carts)
                        //             ContextVal.state.count = responseJson.data.total_carts;
                        //         }
                        //     })
                        //     .catch(error => {
                        //         console.error(error);
                        //     });
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
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>

                <Logo />
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.LoginForm}>
                        <View style={[style.SectionStyle, !this.state.userVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-person"
                                size={hp('3%')}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Username"
                                placeholderTextColor='#DBC6C6'
                                autoCapitalize='none'
                                onChangeText={(text) => this.updateValue(text, 'username')}
                                keyboardType="email-address"
                                returnKeyType='next'
                                onSubmitEditing={()=> this.refs.pass.focus()}
                            />
                        </View>
                        <View style={[style.SectionStyle, !this.state.passVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-lock"
                                size={hp('3%')}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Password"
                                underlineColorAndroid='transparent'
                                secureTextEntry={this.state.hidePassword}
                                placeholderTextColor='#DBC6C6'
                                autoCapitalize='none'
                                returnKeyType='go'
                                onChangeText={(text) => this.updateValue(text, 'password')}
                                ref="pass"
                            />
                            <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                                <Icon style={{ color: '#ffffff', }} name={(this.state.hidePassword) ? "md-eye-off" : "md-eye"} size={hp('3%')} />
                            </TouchableOpacity>
                        </View>

                        <CartContext.Consumer>
                            {ContextVal => (
                                <TouchableOpacity style={style.WhiteButton} onPress={() => this.submit(ContextVal)}>
                                    <Text style={style.WhiteTextbutton}>LOGIN</Text>
                                </TouchableOpacity>
                            )}
                        </CartContext.Consumer>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgetpw')}>
                            <Text style={{ fontSize: hp('2.1%'), color: '#ffffff' }}> Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={style.signupTextCont}>
                    <Text style={style.signupText}>DONT HAVE AN ACCOUNT?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={style.signupButton}> SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
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

    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: hp('3%'),
        width: wp('8%'),
        paddingRight: 2
    },

});