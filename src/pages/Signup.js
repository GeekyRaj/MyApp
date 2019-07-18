import React, {Component} from 'react';
import { StyleSheet, Text,TextInput, View,StatusBar, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import FormS from '../components/formSignup';

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
                <FormS type="SignUp"/>
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
    container: {
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