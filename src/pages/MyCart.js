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
        paddingVertical: 10,
    },
    boxend: {
        flex: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        width: 190,
        height: 45,
        backgroundColor: '#e91c1a',
        borderRadius: 10,
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
            cartTotal: "00000",
            tempProductId: "",
            editCartQuantity: "",
            activeRowKey: null,
            pid: null,
            rowIndex: null,
            value: null,
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

    //Update Quantity
    UpdateQty(value, id){
        const token = this.state.access_token;
        const qty=value;
        const pid=id;
        console.log(pid+' '+qty);

        const fetchConfig = {
            method: "POST",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `product_id=${pid}&quantity=${qty}`
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/editCart`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
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
                                            //value={item.quantity}
                                            initValue={item.quantity}
                                            //onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                            totalWidth={70}
                                            totalHeight={30}
                                            iconSize={25}
                                            minValue={1}
                                            maxValue={8}
                                            step={1}
                                            valueType='integer'
                                            rounded
                                            textColor='black'
                                            iconStyle={{ color: 'black' }}
                                            rightButtonBackgroundColor='red'
                                            leftButtonBackgroundColor='white'
                                            onChange={value=> this.UpdateQty(value, item.product.id)} />
                                    </View>
                                </View>
                                <View style={{ width: 380, height: 1, backgroundColor: 'gray', marginTop: 5, }}>

                                </View>
                            </View></Swipeout>);

                    }

                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.boxend}>
                    <View style={{ flexDirection: 'row', margin: 10, }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold",paddingRight:30, }}> Rs. {this.state.cartTotal} </Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddAddress')}>
                        <Text style={styles.Textbutton}>ORDER NOW</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}