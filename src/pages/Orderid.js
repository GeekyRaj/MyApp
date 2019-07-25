import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
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
            title: "Order ID",
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


    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginRight: 10, }}>
                                <Image
                                    style={{ height: 100, width: 100, margin: 3, }}
                                    source={item.img} />
                                <View style={{ flexGrow: 1, flexDirection: 'column', marginRight: 10,marginLeft:5, }}>
                                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}> {item.name}</Text>
                                    <Text style={{ fontSize: 15, paddingTop: 10, }}>( {item.categ} )</Text>
                                    <Text style={{ fontSize: 15, paddingTop: 10, }}>QTY {item.qty} </Text>
                                </View>
                                <View style={{ flexGrow: 1, marginLeft: 10, }}>
                                    <Text style={{ fontSize: 20, paddingLeft: 30, paddingTop: 30, fontWeight: "bold", }}>Rs. {item.amt}</Text>
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