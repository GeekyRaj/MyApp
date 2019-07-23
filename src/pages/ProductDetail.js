import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';

 export default class ProductDetail extends Component {
    static navigationOptions = {
        title: 'Product Details',
        headerLeft: null,
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Product Detail</Text>
                <Text>Name: {this.props.navigation.state.params.pname}</Text>
                <Text>Name: {this.props.navigation.state.params.pid}</Text>
            </View>
        )
    }
}