import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, CheckBox, } from 'react-native';
import Logo from '../components/Logo';
import RadioGender from '../components/RadioGender';
import Icon from '@expo/vector-icons/Ionicons';
import API from '../components/API';
import style from '../Styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

const options = [
    {
        key: 'M',
        text: 'Male',
    },
    {
        key: 'F',
        text: 'Female',
    },
];


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
            fname: ' ',
            lname: ' ',
            email: ' ',
            pass: ' ',
            cpass: ' ',
            gender: null,
            pno: ' ',
            errmsg: ' ',
            error: 0,
            //ShowErrorBorder var Validate
            fnameVal: true,
            lnameVal: true,
            emailVal: true,
            passVal: true,
            cpassVal: true,
            pnoVal: true,
        }
    }

    myCallback = (gd) => {
        this.setState({ gender: gd });
        //console.log('Callback : '+this.state.gender);
    }

    updateValue(text, field) {
        alph = /^[a-zA-Z]+$/;
        mailreg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        phonereg = /^\d{3}\d{3}\d{4}$/;

        if (field == 'fname') {
            if (alph.test(text)) {
                this.setState({
                    fname: text,
                    fnameVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid First name');
                this.setState({ errmsg: 'Enter Only alphabets for First Name !', error: 1, fnameVal: false, })
            }

        }
        else if (field == 'lname') {
            if (alph.test(text)) {
                this.setState({
                    lname: text,
                    lnameVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid last name');
                this.setState({ errmsg: 'Enter Only alphabets for last Name !', error: 1, lnameVal: false, })
            }
        }
        else if (field == 'email') {
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
        else if (field == 'pass') {
            if (passreg.test(text)) {
                this.setState({
                    pass: text,
                    passVal: true,
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
                    cpass: text,
                    cpassVal: true,
                    error: 0,
                })
            }
            else {
                console.log(' password mismatch');
                this.setState({ errmsg: 'paassword doesnt match !', error: 1, cpassVal: false, })
            }
        }
        else if (field == 'pno') {
            if (phonereg.test(text)) {
                this.setState({
                    pno: text,
                    pnoVal: true,
                    error: 0,
                })
            }
            else {
                console.log('Inavlid Phone Number');
                this.setState({ errmsg: 'Enter 10 digit Contact Number!', error: 1, pnoVal: false, })
            }
        }
    }

    Register() {
        console.log(this.state.errmsg);
        console.log(this.state.error);
        let collection = {}
        collection.fname = this.state.fname,
            collection.lname = this.state.lname,
            collection.email = this.state.email,
            collection.pass = this.state.pass,
            collection.cpass = this.state.cpass,
            collection.gender = this.state.gender,
            collection.pno = this.state.pno,
            console.log(collection);

        if (this.state.error == 0) {
            const url ="users/register";
            const method ="POST";
            const body = `first_name=${collection.fname}&last_name=${collection.lname}&email=${collection.email}&password=${collection.pass}&confirm_password=${collection.cpass}&gender=${collection.gender}&phone_no=${collection.pno}`;
            API(url,method,body)
            // fetch('http://staging.php-dev.in:8844/trainingapp/api/users/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     body:
            //         `first_name=${collection.fname}&last_name=${collection.lname}&email=${collection.email}&password=${collection.pass}&confirm_password=${collection.cpass}&gender=${collection.gender}&phone_no=${collection.pno}`
            // }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    const msg = responseJson.user_msg
                    const status = responseJson.status
                    const msgerr = responseJson.message
                    if (status == 200) {
                        alert('Registration Sucessfull..! Try Logging in.');
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

    componentDidMount() {
        console.log('----Sign up Component Did Mounnt----');
    }

    render() {
        console.log('My Cart Render'); console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.containerMain}>
            <View style={styles.containerMain}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Logo />
                    <View style={styles.container}>

                        <View style={[style.SectionStyle, !this.state.fnameVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-person"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="First Name"
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'fname')}
                            />
                        </View>
                        <View style={[style.SectionStyle, !this.state.lnameVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-person"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Last Name"
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'lname')}
                            />
                        </View>
                        <View style={[style.SectionStyle, !this.state.emailVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-mail"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Email"
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'email')}
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={[style.SectionStyle, !this.state.passVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-lock"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'pass')}
                            />
                        </View>
                        <View style={[style.SectionStyle, !this.state.cpassVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-lock"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'cpass')}
                            />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: hp('2.1%'),
                                color: '#ffffff',
                                textAlign: 'left',
                                paddingRight: 10,
                            }}>Gender
                        </Text>

                            <RadioGender
                                options={options}
                                callbackFromParent={this.myCallback} />
                        </View>

                        <View style={[style.SectionStyle, !this.state.pnoVal ? style.error : null]}>
                            <Icon
                                style={style.Expoicon}
                                name="md-phone-portrait"
                                size={25}
                            />
                            <TextInput
                                style={style.inputBox}
                                placeholder="Phone Number"
                                secureTextEntry={true}
                                placeholderTextColor='#ffffff'
                                onChangeText={(text) => this.updateValue(text, 'pno')}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{
                            paddingVertical: 12,
                            flexDirection: 'row'
                        }}>
                            <CheckBox checked={true} />
                            <Text style={{
                                fontSize: hp('2.1%'),
                                color: '#ffffff',
                                textAlign: 'left'
                            }}>I agree the Terms and conditions.
                    </Text>
                        </View>
                        <TouchableOpacity style={style.WhiteButton} onPress={() => this.Register()}>
                            <Text style={style.WhiteTextbutton}>REGISTER</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={style.signupTextCont}>
                        <Text style={style.signupText}>ALREADY HAVE AN ACCOUNT?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                            <Text style={style.signupButton}> SIGN IN</Text>
                        </TouchableOpacity>
                    </View></KeyboardAvoidingView>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: '#e91C1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginVertical: 10,
        flexGrow: 1,
        alignItems: 'center',
    },
    error: {
        borderWidth: 2,
        borderColor: 'orange',
    }
});