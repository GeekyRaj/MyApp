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
        }
    }
    updateValue(text, field) {
        if (field == 'fname') {
            this.setState({
                fname: text,
            })
        }
        else if (field == 'lname') {
            this.setState({
                lname: text,
            })
        }
        else if (field == 'email') {
            this.setState({
                email: text,
            })
        }
        else if (field == 'pass') {
            this.setState({
                pass: text,
            })
        }
        else if (field == 'cpass') {
            this.setState({
                cpass: text,
            })
        }
        else if (field == 'pno') {
            this.setState({
                pno: text,
            })
        }
    }

    Register() {
        let collection = {}
        collection.fname = this.state.fname,
        collection.lname = this.state.lname,
        collection.email = this.state.email,
        collection.pass = this.state.pass,
        collection.cpass = this.state.cpass,
        collection.gender = this.state.gender,
        collection.pno = this.state.pno,
        console.log(collection);

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
                if (status == 200) {
                    alert('Registration Sucessfull..! Try Logging in.');
                }
                else {
                    alert(msg)
                }

            })
    }

    render() {
        return (
            <View style={styles.containerMain}>
                <Logo />
                <View style={styles.container}>
                    <View style={styles.SectionStyle}>
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
                    <View style={styles.SectionStyle}>
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
                    <View style={styles.SectionStyle}>
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
                            onChangeText={(text) => this.updateValue(text, 'pass')}
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
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'cpass')}
                        />
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{
                            fontSize: 16,
                            color: '#ffffff',
                            textAlign: 'left',
                            paddingRight: 10,
                        }}>Gender
                        </Text>

                        <RadioGender options={options} />
                    </View>

                    <View style={styles.SectionStyle}>
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
    }
});