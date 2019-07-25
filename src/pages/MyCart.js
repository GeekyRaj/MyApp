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
import { Dropdown } from 'react-native-material-dropdown';

const data = [
    { img: require('../images/Table.png'), categ: 'table', amt: '30000', qty: 2, name: 'Dinning Table' },
    { img: require("../images/Sofas.png"), categ: 'Sofa', amt: '25000', qty: 3, name: 'Office Sofa' },
    { img: require("../images/Chairs.png"), categ: 'Chair', amt: '25000', qty: 1, name: ' Designer Chair' },
]

export default class MyCart extends Component {
    static navigationOptions = {
        title: 'My Cart',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    render() {
        let datad = [{
            value: '1',
        }, {
            value: '2',
        }, {
            value: '3',
        }, {
            value: '4',
        }, {
            value: '5',
        }];

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View>
                            <View style={{ flex: 0, flexDirection: 'row', marginTop: 10, marginRight: 10, }}>
                                <Image
                                    style={{ height: 100, width: 100, margin: 3, }}
                                    source={item.img} />
                                <View style={{ flexGrow: 1, flexDirection: 'column', marginRight: 10, marginLeft: 5, }}>
                                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}> {item.name}</Text>
                                    <Text style={{ fontSize: 15, paddingTop: 10, }}>( {item.categ} )</Text>
                                    <Dropdown
                                        label='Qty'
                                        data={datad}
                                    />
                                </View>
                                <View style={{ flexGrow: 1, marginLeft: 10, }}>
                                    <Text style={{ fontSize: 20, paddingLeft: 30, paddingTop: 30, fontWeight: "bold", }}>Rs. {item.amt}</Text>
                                </View>
                            </View>
                            <View style={{ width: 380, height: 1, backgroundColor: 'gray', marginTop: 5, }}>

                            </View>
                        </View>
                    }
                    keyExtractor={({ id }, index) => id}
                />
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", paddingRight: 150, }}> TOTAL </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", }}> Rs. 6789 </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddressList')}>
                    <Text style={styles.Textbutton}>ORDER NOW</Text>
                </TouchableOpacity>
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
    },
    button: {
        width: 300,
        backgroundColor: '#E91c1a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    },
})