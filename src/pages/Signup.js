import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity, CheckBox, } from 'react-native';
import Logo from '../components/Logo';
import FormS from '../components/formSignup';
import RadioGender from '../components/RadioGender';
import Icon from '@expo/vector-icons/Ionicons';


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
            gender: 'M',
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

        if (this.state.error == 0) 
        {
            fetch('http://staging.php-dev.in:8844/trainingapp/api/users/register', {
                method: 'POST',
                headers: {

                    'access_token': "5d3ed6f3b6333",
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    `first_name=${collection.fname}&last_name=${collection.lname}&email=${collection.email}&password=${collection.pass}&confirm_password=${collection.cpass}&gender=${collection.gender}&phone_no=${collection.pno}`
            }).then((response) => response.json())
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
        else
        {
            alert(this.state.errmsg);
        }
    }

    render() {
        return (
            <View style={styles.containerMain}>
                <Logo />
                <View style={styles.container}>
                    <View style={[styles.SectionStyle, !this.state.fnameVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-person"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="First Name"
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'fname')}
                        />
                    </View>
                    <View style={[styles.SectionStyle, !this.state.lnameVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-person"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Last Name"
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'lname')}
                        />
                    </View>
                    <View style={[styles.SectionStyle, !this.state.emailVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-mail"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Email"
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'email')}
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
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'pass')}
                        />
                    </View>
                    <View style={[styles.SectionStyle, !this.state.cpassVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-lock"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'cpass')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#ffffff',
                            textAlign: 'left',
                            paddingRight: 10,
                        }}>Gender
                        </Text>

                        <RadioGender options={options} />
                    </View>

                    <View style={[styles.SectionStyle, !this.state.pnoVal ? styles.error : null]}>
                        <Icon
                            style={{ paddingLeft: 16, color: '#ffffff' }}
                            name="md-phone-portrait"
                            size={25}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Phone Number"
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'pno')}
                        />
                    </View>
                    <View style={{
                        paddingVertical: 12,
                        flexDirection: 'row'
                    }}>
                        <CheckBox checked={true} />
                        <Text style={{
                            fontSize: 16,
                            color: '#ffffff',
                            textAlign: 'left'
                        }}>I agree the Terms and conditions.
                    </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.Register()}>
                        <Text style={styles.Textbutton}>REGISTER</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>ALREADY HAVE AN ACCOUNT?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                        <Text style={styles.signupButton}> SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    container: {
        marginVertical: 10,
        flexGrow: 1,
        alignItems: 'center',
    },
    inputBox: {
        width: 250,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 5,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 40,
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
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
    error: {
        borderWidth: 2,
        borderColor: 'orange',
    }
});