import React, { Component, } from 'react';
import { DraerActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
  YellowBox,
  AsyncStorage
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import Icon from '@expo/vector-icons/Ionicons';
import { Row } from 'native-base';
import Sofas from './Sofas';
import Chairs from './Chairs';
import Cupboards from './Cupboards';
import Table from './Table';

import Header from '../components/Header';
const { width } = Dimensions.get('window');

export default class DashboardScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'NeoSTORE',
    headerStyle: {
      backgroundColor: '#e91c1a',
    },
    headerTintColor: '#fff',
  });

  constructor() {
    super();
    this.state = {
      token: ' ',
      fname: ' ',
    }
    this._retrieveData();
  }

    _retrieveData = async () => {
      try {
        this.setState({
          item: await AsyncStorage.getItem('@user_at'),
          fname: await AsyncStorage.getItem('@user_fname')
        })
        console.log('in home')
      } catch (e) {
        console.log(e);
      }
      console.log('Stored value : ', this.state.item, ' Fname ', this.state.fname);
    }
  render() {
    YellowBox.ignoreWarnings(["Warning: componentWillUpdate is deprecated"]);
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;


    //const access_id= this.props.navigation.getParam("access_id",1);

    return (

      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{
            height: 240,
          }}
        >
          <Image
            style={{ height: imageHeight, width: imageWidth }}
            source={require("../images/slider_img1.jpg")}
          />
          <Image
            style={{ height: imageHeight, width: imageWidth }}
            source={require("../images/slider_img2.jpg")}
          />
          <Image
            style={{ height: imageHeight, width: imageWidth }}
            source={require("../images/slider_img3.jpg")}
          />
          <Image
            style={{ height: imageHeight, width: imageWidth }}
            source={require("../images/slider_img4.jpg")}
          />
        </ScrollView>
        <FlatList
          numColumns={2}
          data={[
            { key: 1, ur: require('../images/Table.png'), pth: 'Table' },
            { key: 2, ur: require("../images/Sofas.png"), pth: 'Sofas' },
            { key: 3, ur: require("../images/Chairs.png"), pth: 'Chairs' },
            { key: 4, ur: require("../images/Cupboards.png"), pth: 'Cupboards' },
          ]}
          renderItem={({ item }) => {
            const p = item.pth;
            return <TouchableOpacity key={item.key} onPress={() => this.props.navigation.navigate(p)}>
              <Image
                style={{ height: 160, width: 180, margin: 10, }}
                source={item.ur} />
            </TouchableOpacity>
          }
          }
          keyExtractor={
            (item, index) => index.toString()
          }
        />

      </View>
    );
  }
}