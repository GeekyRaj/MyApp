import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Swipeout from 'react-native-swipeout';
import Icon from '@expo/vector-icons/Ionicons';
import { withNavigation } from "react-navigation";
import API from '../components/API';

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
        marginRight: 20,
    },
});

class MyCart extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
        title: 'My Cart',
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
            cartCount: "",
            cartTotal: "00000",
            tempProductId: "",
            editCartQuantity: "",
            activeRowKey: null,
            pid: null,
            rowIndex: null,
            value: null,
            cartStatus: 'Cart Empty...!',
            cartupdate: '',
            update: 0,
        };
        console.log('\n **** In Mycart ****')
    }

    /* ------------ Get CART details----------- */
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            this.getCartData();
          });
        console.log('----MyCart Did Mounnt----');  
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    //CHECK IF ANY UPDATE IN CART
    async  componentDidUpdate() {
            const cartupdate = await AsyncStorage.getItem("@user_addcart");
            if (cartupdate == 'yes') {
                this.getCartData();
                console.log('----Componenet DidUpdate----');
                AsyncStorage.setItem('@user_addcart', 'no');
            }
    }

     getCartData=async()=> {
         try{
            const url = "cart";
            method = "GET";
            return API(url,method,null)
                .then(responseJson => {
                    console.log(responseJson);
                    this.setState({
                        dataSource: responseJson.data,
                        cartCount: responseJson.count,
                        cartTotal: responseJson.total
                    });
                    
                    if (responseJson.message == 'Cart Empty') {
                        this.setState({ cartStatus: 'Cart Empty..!' })
                    }
                    else { this.setState({ cartStatus: '' }) }
                    console.log('getCartData() : Cart Data retreived');
                })
                .catch(error => {
                    console.error(error);
                });
         }catch(error){
             console.log(error)
         }
       
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
        console.log('Pid delete :' + product_id);
        const url = "deleteCart";
        const method = "POST";
        const body = `product_id=${product_id}`;
        return API(url,method,body)
            .then(responseJson => {
                //console.log(responseJson);
                if (responseJson.status == 200) {
                    this.getCartData();
                    this.setState({ update : 1 });
                    console.log(responseJson.status);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    //Update Quantity
    UpdateQty(value, id) {
        //const token = this.state.access_token;
        const qty = value;
        const pid = id;
        console.log(pid + ' ' + qty);
        const url = "editCart";
        const method = "POST";
        body = `product_id=${pid}&quantity=${qty}`;
        return API(url,method,body)
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.status == 200) {
                    console.log(responseJson.status);
                    this.getCartData();
                    this.setState({ update : 1 });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        {console.log('My Cart Render');
        if(this.state.update == 1){
            console.log('UPDATE');
            this.getCartData();
            this.setState({ update: 0,})
        }
    }
        
        const swipeoutBtns = [
            {
                text: 'Delete',
                onPress: () => (this.swipeHandleDelete(this.state.pid)),
                backgroundColor: 'red',
                color: 'white',
            }
        ];

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 20, color: 'red' }}>{this.state.cartStatus}</Text>
                <FlatList
                    data={this.state.dataSource}
                    extraData={this.state.rowIndex}
                    renderItem={({ item, index }) => {

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
                                            onChange={value => this.UpdateQty(value, item.product.id)} />
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

                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddAddress')}>
                            <Text style={styles.Textbutton}>ORDER NOW</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontWeight: "bold", }}> Rs. {this.state.cartTotal} </Text>

                    </View>
                </View>
            </View>
        );
    }
}
export default withNavigation(MyCart);