import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';

 export default class Cupboards extends Component {
    static navigationOptions = {
        title: 'Cupboards',
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Cupboards</Text>
            </View>
        )
    }
}