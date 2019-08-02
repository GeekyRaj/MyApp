import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    AsyncStorage,
    RefreshControl,
} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import Icon from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import Swipeout from 'react-native-swipeout';

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
});

export default class MyCart extends Component {
    static navigationOptions = {
        title: 'My Cart',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor() {
        super();
        this.state = {
            access_token: "",
            dataSource: [],
            cartCount: "",
            cartTotal: "",
            tempProductId: "",
            editCartQuantity: "",
            activeRowKey: null,
            pid: null,
            rowIndex: null,
        };
        this.getCartData();
        console.log('in Mycart')
    }

    /* ------------ Get CART details----------- */
    async componentDidMount() {
        this.getCartData();
    }
    async componentWillMount() {
        this.getCartData();
    }

    //CHECK IF ANY UPDATE IN CART
    async componentDidUpdate() {
        const cartupdate = await AsyncStorage.getItem("@user_addcart");
        if (cartupdate == 'yes') {
            this.getCartData();
            console.log('Cart updated')
            AsyncStorage.setItem('@user_addcart', 'no');
        }
    }

    async getCartData() {
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
            `http://staging.php-dev.in:8844/trainingapp/api/cart`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson.data,
                    cartCount: responseJson.count,
                    cartTotal: responseJson.total
                });
                //console.log(responseJson);
                try {
                    console.log('Cart Data retreived');
                } catch (error) {
                    console.log(error);
                    // Error saving data
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    //SwipeOut for deleting cart 
    onSwipeOpen(rowIndex, pid) {
        this.setState({
            rowIndex: rowIndex,
            pid: pid
        })
        console.log(this.state.pid);
    }
    onSwipeClose(rowIndex) {
        if (rowIndex === this.state.rowIndex) {
            this.setState({
                rowIndex: null,
                pid: null,
            });
        }
        console.log(this.state.pid);
    }

    swipeHandleDelete(id) {
        const product_id = id;
        const token = this.state.access_token;
        console.log('Pid delete :' + product_id);

        const fetchConfig = {
            method: "POST",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `product_id=${product_id}`
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/deleteCart`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    //dataSource: responseJson.data,
                });
                console.log(responseJson);
                if (responseJson.status == 200) {
                    console.log(responseJson.status);
                    this.getCartData();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {

        const swipeoutBtns = [
            {
                text: 'Delete',
                onPress: () => (this.swipeHandleDelete(this.state.pid)),
                backgroundColor: 'red',
                color: 'white',
            }
        ];

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.state.dataSource}
                    extraData={this.state.rowIndex}
                    renderItem={({ item, index }) => {

                        /*<FlatListItem item={item} index={index} />*/

                        return (<Swipeout
                            right={swipeoutBtns} backgroundColor={'white'}
                            onOpen={() => (this.onSwipeOpen(index, item.product.id))}
                            close={this.state.rowIndex !== index}
                            onClose={() => (this.onSwipeClose(index, item.product.id))}
                            rowIndex={index}
                            sectionId={0}
                            autoClose={true}
                        >
                            <View>
                                <View style={{ flex: 0, flexDirection: 'row', marginTop: 10, marginRight: 10, }}>
                                    <Image
                                        style={{ height: 90, width: 90, margin: 8, }}
                                        source={{ uri: item.product.product_images }} />
                                    <View style={{ flexGrow: 1, flexDirection: 'column', marginLeft: 5, }}>
                                        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold", }}> {item.product.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 15, }}>( {item.product.product_category} )</Text>
                                            <Text style={{ fontSize: 17, paddingLeft: 20, paddingTop: 10, fontWeight: "bold", }}>Rs. {item.product.sub_total}</Text>
                                        </View>
                                        <NumericInput
                                            value={item.quantity}
                                            totalWidth={70}
                                            totalHeight={30}
                                            onChange={value => console.log(value)} />
                                    </View>
                                </View>
                                <View style={{ width: 380, height: 1, backgroundColor: 'gray', marginTop: 5, }}>

                                </View>
                            </View></Swipeout>);

                    }

                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", paddingRight: 150, }}> TOTAL </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", }}> Rs. {this.state.cartTotal} </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddressList')}>
                    <Text style={styles.Textbutton}>ORDER NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}