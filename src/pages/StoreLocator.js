import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const data = [
  { name: 'SKYLAND STORE', add: '6355 Edgewood Road Reisterstown, MD 21136'},
  {name:'WOODMOUNT STORE',add:'9437 Pin Oak South Plainfield, NJ 07080'},
  {name:'NATUFUR STORE',add:'3798 Pennsylvania Avenue Brandon,FL 33510'},
  {name:'LAVANDER STORE',add:'9311 Garfield Avenue hamburg, NY 14075'},
  {name:'FURNIMATT STORE',add:'7346 Hanover Court Arlington, MA 02474'},
]

export default class StoreLocator extends Component {
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
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image  style={{height: 280,width: 410,}} source={require('../images/map.png')} />
        <FlatList
          data={data}
          renderItem={({ item }) =>
            
            <TouchableOpacity>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginRight: 10, }}>
                <Image  style={{height: 30,width: 30,color:'gray'}} source={require('../images/locator_icon.png')} />
                <View style={{ flexGrow: 1, flexDirection: 'column', marginRight: 10, }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}> {item.name}</Text>
                  <Text style={{ fontSize: 15, paddingTop: 10, }}> {item.add}</Text>
                </View>
              </View>
              <View style={{ width: 380, height: 1, backgroundColor: 'gray', marginTop: 5, }}></View>
            </TouchableOpacity>

          }
          keyExtractor={({ id }, index) => id}
        />

      </View>
    )
  }
}