import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
 } from 'react-native';

 export default class MyAccount extends Component {
    static navigationOptions = {
        title: 'My Account',
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render(){
        return(
            <View style={ styles.container}>
                <Text>Account</Text>
                <View style={styles.SectionStyle}>
                <Image style={styles.imgIcon} source={require('../images/myorders_icon.png')} />
                <TextInput 
                    style={styles.inputBox}
                    placeholder = "First Name"
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#e91c1a"
    },
    inputBox: {
        width: 250,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical:5,
        fontSize: 16,
        color: '#ffffff' ,
        marginVertical :5, 
    },
    imgIcon: {
		height: 25,
        width: 25,
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
  });