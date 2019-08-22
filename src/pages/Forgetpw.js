import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import Logo from '../components/Logo';
import style from '../Styles';
import Icon from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
        console.log('My Cart Render'); console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                <Logo />
                <View style={styles.LoginForm}>
                    <View style={style.SectionStyle}>
                        <Icon
                            style={style.Expoicon}
                            name="md-person"
                            size={hp('3%')}
                        />
                        <TextInput
                            style={style.inputBox}
                            placeholder="Email address"
                            placeholderTextColor='#ffffff'
                            onChangeText={(text) => this.updateValue(text, 'email')}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            returnKeyType='go'
                        />
                    </View>
                    <TouchableOpacity style={style.WhiteButton} onPress={this.onPressButton}>
                        <Text style={style.WhiteTextbutton}>Change Password</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.signupTextCont}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                        <Text style={styles.signupButton}> Login?</Text>
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
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupButton: {
        color: '#ffffff',
        fontSize: hp('3%'),
        fontWeight: '500',
    }
});