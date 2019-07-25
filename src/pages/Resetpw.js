import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';
 import { createStackNavigator, createAppContainer } from 'react-navigation';

import Logo from '../components/Logo';
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
    render(){
        return(
            <View style={styles.container}>
               
                <View style={styles.LoginForm}>
                <TextInput 
                    style={styles.inputBox}
                    placeholder = "Current Password"
                    placeholderTextColor ='#ffffff'
                 />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "New Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
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
        marginVertical:20,
        flexGrow: 1,
        alignItems: 'center',
        marginTop:100,
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
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