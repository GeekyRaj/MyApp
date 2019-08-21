import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { withNavigation } from "react-navigation";
import API from '../components/API';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 class MyOrders extends Component {
  static navigationOptions = {
    title: 'My Orders',
    headerStyle: {
      backgroundColor: '#e91c1a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',

    }
  };

  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: [],
      update: 'no',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            this.getOrderList();
          });
  }

  async getOrderList() {
    const url = "orderList";
    method = "GET";
    return API(url,method,null)
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.data,
        });
        console.log('OrderList retreived');
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.disableYellowBox = true;

    return (
      <View >
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>

            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Orderid',{oid:item.id})}>
              <View  style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginRight: 10,marginLeft:10, }}>
                <View  style={{ flex: 5, flexDirection: 'column', marginRight: 10, }}>
                  <Text style={{ fontSize: hp('3%'), marginTop: 10, fontWeight: "bold", }}>Order ID {item.id}</Text>
                  <Text style={{ fontSize: hp('1.5%'), paddingTop: 10, }}>Ordered date {item.created}</Text>
                </View>
                <View style={{ flex: 4, marginLeft: 10, }}>
                  <Text style={{ fontSize: hp('3%'), paddingLeft: 30, paddingTop: 30, fontWeight: "bold", }}>Rs. {item.cost}</Text>
                </View>
              </View>
              <View style={{ width: '90%', height: 1, backgroundColor: 'gray', marginTop: 5,marginLeft:13,}}></View>
            </TouchableOpacity>

          }
          keyExtractor={({ id }, index) => id}
        />
      </View>
    )
  }
}

export default withNavigation(MyOrders);