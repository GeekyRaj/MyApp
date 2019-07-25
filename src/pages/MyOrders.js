import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
const data = [
  { id: '1234', date: '07 Aug 2018', amt: '30000' },
  { id: '2456', date: '02 Sep 2018', amt: '25000' },
  { id: '9854', date: '02 Sep 2018', amt: '25000' },
]

export default class MyOrders extends Component {
  static navigationOptions = {
    title: 'My Orders',
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

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={data}
          renderItem={({ item }) => 
    
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Orderid')}>
                <View style={{flex:1,flexDirection:'row',marginTop:20,marginRight:10,}}>
                  <View style={{flexGrow:1,flexDirection:'column',marginRight:10,}}>
                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}>Order ID {item.id}</Text>
                    <Text style={{ fontSize: 15, paddingTop:10, }}>Ordered date {item.date}</Text>
                  </View>
                  <View style={{flexGrow:1,marginLeft:10,}}>
                    <Text style={{ fontSize: 20, paddingLeft: 30,paddingTop:30, fontWeight: "bold", }}>Rs. {item.amt}</Text>
                  </View>
                </View>
                <View style={{width:380,height:1,backgroundColor:'gray',marginTop:5,}}></View>
            </TouchableOpacity>
          
          }
          keyExtractor={({id}, index) => id}
        />
      </View>
    )
  }
}