import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { withNavigation, SafeAreaView } from "react-navigation";
import API from '../components/API';
import Icon from '@expo/vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 class MyOrders extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'My Orders',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft:
            (<Icon
                style={{ paddingLeft: 16, color: '#ffffff' }}
                onPress={() => navigation.navigate('Dashboard')}
                name="md-arrow-back"
                size={30}
            />),
    };
};

  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: [],
      update: 'no',
      isloading: true,
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
          isloading: false,
        });
        console.log('OrderList retreived');
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.disableYellowBox = true;

    if(this.state.isloading){
      return (
          <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
          <Image source={require("../images/Loader1.gif")} />
          </View>
        )
    }
    return (
      <SafeAreaView>
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
      </SafeAreaView>
    )
  }
}

export default withNavigation(MyOrders);