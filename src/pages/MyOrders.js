import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
 } from 'react-native';

 export default class MyOrders extends Component {
    static navigationOptions = {
        title: 'Store Locator',
        /*headerLeft:(<Icon
          style={{ paddingLeft:15,paddingRight: 16 , color: '#ffffff'}}
          onPress={() => this.props.navigation.dispatch(DraerActions.openDrawer())}
          name="md-menu"
          size={30}
        />),*/
        headerStyle: {
          backgroundColor: '#e91c1a',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          }
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>My Orders</Text>
            </View>
        )
    }
}