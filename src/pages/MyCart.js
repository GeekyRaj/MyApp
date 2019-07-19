import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';
 import Icon from '@expo/vector-icons/Ionicons';


 export default class MyCart extends Component {
    static navigationOptions = {
        title: 'My Cart',
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>MyCart</Text>
            </View>
        )
    }
}