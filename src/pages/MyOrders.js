import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from 'react-native';
const data = [
  { id: '1234', date: '07 Aug 2018', amt: '30000' },
  { id: '2456', date: '02 Sep 2018', amt: '25000' },
  { id: '9854', date: '02 Sep 2018', amt: '25000' },
]

export default class MyOrders extends Component {
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
      dataSource: []
    };
  }

  async componentDidMount() {
    this.getOrderList();
  }

  async getOrderList() {
    const token = await AsyncStorage.getItem("@user_at");
    this.setState({ access_token: token })
    console.log(this.state.access_token);
    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/orderList`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.data,
        });
        console.log(responseJson);
        try {
          console.log('OrderList retreived');
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Orderid',{oid:item.id})}>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginRight: 10, }}>
                <View style={{ flexGrow: 1, flexDirection: 'column', marginRight: 10, }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}>Order ID {item.id}</Text>
                  <Text style={{ fontSize: 15, paddingTop: 10, }}>Ordered date {item.created}</Text>
                </View>
                <View style={{ flexGrow: 1, marginLeft: 10, }}>
                  <Text style={{ fontSize: 20, paddingLeft: 30, paddingTop: 30, fontWeight: "bold", }}>Rs. {item.cost}</Text>
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