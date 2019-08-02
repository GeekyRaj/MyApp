import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const data = [
    { img: require('../images/Table.png'), categ: 'table', amt: '30000', qty: 2, name: 'Dinning Table' },
    { img: require("../images/Sofas.png"), categ: 'Sofa', amt: '25000', qty: 3, name: 'Office Sofa' },
    { img: require("../images/Chairs.png"), categ: 'Chair', amt: '25000', qty: 1, name: ' Designer Chair' },
]

export default class Orderid extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            //title: navigation.getParam('pname', 'Product Detail'),
            title: "Order ID : "+navigation.getParam('oid','2121'),
            headerTintColor: '#fff',
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
            headerRight: null
        };
    };

    constructor() {
        super();
        this.state = {
            access_token: "",
            dataSource: [],
            address: "",
            cost: ""
        };
    }

    async componentDidMount() {
        this.getOrderListDetail();
    }

    async getOrderListDetail() {
        const token = await AsyncStorage.getItem("@user_at");
        const oid = this.props.navigation.getParam('oid', '2121');
        const fetchConfig = {
            method: "GET",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${oid}`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson.data.order_details,
                });
                console.log(responseJson);
                try {
                    console.log('OrderListDetails retreived');
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

                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginRight: 10, }}>
                                <Image
                                    style={{ height: 100, width: 100, margin: 3, }}
                                    source={{ uri: item.prod_image }} />

                                <View style={{ flexGrow: 1, flexDirection: 'column', marginLeft: 5, }}>
                                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}> {item.prod_name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, paddingTop: 10, }}>( {item.prod_cat_name} )</Text>
                                        <Text style={{ fontSize: 20, paddingLeft: 30, paddingTop: 30, fontWeight: "bold", }}>Rs. {item.total}</Text>
                                    </View>
                                    <Text style={{ fontSize: 15, paddingTop: 10, }}>QTY {item.quantity} </Text>
                                </View>

                            </View>
                            <View style={{ width: 380, height: 1, backgroundColor: 'gray', marginTop: 5, }}></View>
                        </View>

                    }
                    keyExtractor={({ id }, index) => id}
                />
            </View>
        )
    }
}