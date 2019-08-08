import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';

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
    headerStyle: {
      backgroundColor: '#e91c1a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',

    }
  };
  render() {
    {console.disableYellowBox = true;}
    let dimensions = Dimensions.get("window");
    let Height = dimensions.width-10;
    let Width = dimensions.width-10;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',height:Height,width:Width }}>
        <Image  style={{height: 280,width: 410,}} source={require('../images/map.png')} />
        <FlatList
          data={data}
          renderItem={({ item }) =>
            
            <TouchableOpacity key={item.name}>
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