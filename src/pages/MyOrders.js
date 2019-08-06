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
      dataSource: [],
      update: 'no',
    };
  }

  async componentDidMount() {
    this.getOrderList();
  }

  /*async  componentDidUpdate() {
    this.getOrderList();
}*/

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
        //console.log(responseJson);
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
        <TouchableOpacity style={{ marginTop:10,width: 190,height: 45,backgroundColor: 'gray',borderRadius: 10,}} onPress={() =>this.setState({ update: 'yes'})}>
                    <Text style={styles.Textbutton}>Update Order ?</Text></TouchableOpacity>
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