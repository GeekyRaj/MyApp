import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { withNavigation } from "react-navigation";
import API from '../components/API';


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

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin:10, }}>
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

const styles = StyleSheet.create({
  Textbutton: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center',
      paddingVertical: 10,
  },
  button: {
      width: 190,
      height: 45,
      backgroundColor: '#e91c1a',
      borderRadius: 10,
      marginRight: 20,
  },
});

export default withNavigation(MyOrders);