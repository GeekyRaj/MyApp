import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import StarRating from '../components/StarRating';
import ProductDetail from './ProductDetail';
import Icon from '@expo/vector-icons/Ionicons';
import API from '../components/API';

//type Props = {};

export default class Table extends Component {
  static navigationOptions = {
    title: 'Tables',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    const url ='products/getList?product_category_id=1';
    return API(url,null,null)
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {

    let dimensions = Dimensions.get("window");
    screenW = dimensions.width -10;
    screenH = dimensions.height -10;
    console.log(screenW+' '+screenH);

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    const ratingObj = {
      ratings: 3,
      views: 34000
    }

    return (

      <View style={{ flex: 1, paddingTop: 20, height:screenH, width:screenW }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            const ratingObj = {
              ratings: item.rating,
              views: item.view_count
            }
            return <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { pname: item.name, pid: item.id })}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  style={{ height: 90, width: 90, margin: 10, }}
                  source={{ uri: item.product_images }} />

                <View style={{ flexDirection: 'column', margin: 15, }}>
                  <Text style={{ fontSize: 20, }}>{item.name}</Text>
                  <Text>{item.producer}</Text>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={{ marginTop: 5, marginRight: 80, color: 'red', fontSize: 20 }}>Rs. {item.cost}</Text>
                    <StarRating ratingObj={ratingObj} />
                  </View>
                </View>
              </View></TouchableOpacity>
          }
          }
          keyExtractor={
            (item, index) => index.toString()
          }
        />
      </View>
    )
  }
}