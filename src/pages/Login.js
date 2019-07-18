import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';
 import { createStackNavigator, createAppContainer } from 'react-navigation';
 import Icon from '@expo/vector-icons/Ionicons';

import Logo from '../components/Logo';
import Form from '../components/form';
import Signup from  './Signup';

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
    render(){
        return(
            <View style={styles.container}>
                <Logo/>
                <View style={styles.LoginForm}>
                <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-person"
                    size={25}
                />
                <TextInput 
                    style={styles.inputBox}
                    placeholder = "Username"
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-lock"
                    size={25}
                />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
                     <Text style={styles.Textbutton}>LOGIN</Text>
                 </TouchableOpacity>
                 
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Forgetpw')}>
                    <Text style={{fontSize:16,color: '#ffffff'}}> Forgot Password?</Text>
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
        marginVertical:20,
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
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#ffffff' ,
        marginVertical :10, 
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
        marginVertical :10,
        paddingVertical: 10,
    },
    signupTextCont: {
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection:'row',
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    signupButton:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500',
    }
  });