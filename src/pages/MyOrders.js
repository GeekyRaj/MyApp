import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';

 export default class MyOrders extends Component {
    static navigationOptions = {
        title: 'My Orders',
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>My Orders</Text>
            </View>
        )
    }
}