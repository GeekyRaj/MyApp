import React, {Component} from 'react';
import { StyleSheet, 
    Text,
    View,
    TextInput, 
    TouchableOpacity,
} from 'react-native';


export default class Logo extends Component {
    
    render(){
        return(
            <View style={styles.LoginForm}>
                <TextInput 
                    style={styles.inputBox}
                    placeholder = "Username"
                    placeholderTextColor ='#ffffff'
                 />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
                     <Text style={styles.Textbutton}>{this.props.type}</Text>
                 </TouchableOpacity>
                 <Text style={{fontSize:16,color: '#ffffff'}}> Forgot Password?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    LoginForm: {
        marginVertical:20,
        flexGrow: 1,
        alignItems: 'center',
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
    }
  });