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
import { withNavigation, SafeAreaView } from "react-navigation";
import API from '../components/API';
import CartContext from '../context/CartContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    Textbutton: {
        fontSize: hp('2.5%'),
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 10,
    },
    boxend: {
        flex: 1,
        width: '100%',
        height: hp('8%'),
        backgroundColor: '#ffffff',
        //position: 'absolute',
        //bottom: 0,
    },
    button: {
        width: '50%',
        height: '100%',
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
            activeRowKey: null,
            pid: null,
            rowIndex: null,
            value: null,
            cartStatus: 1,
            cartupdate: '',
            update: 0,
            isloading: true,
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

    getCartData = async () => {
        if(!this.state.isloading){
            this.setState({ isloading: true})
        }
        try {
            const url = "cart";
            const method = "GET";
            return API(url, method, null)
                .then(responseJson => {
                    //console.log(responseJson);
                    this.setState({
                        dataSource: responseJson.data,
                        cartCount: responseJson.count,
                        cartTotal: responseJson.total,
                        isloading: false,
                    });

                    if (responseJson.message == 'Cart Empty') {
                        this.setState({ cartStatus: 0 })
                    }
                    else { this.setState({ cartStatus: 1,  }) }
                    console.log('getCartData() : Cart Data retreived');
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
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

    swipeHandleDelete(id, ContextVal) {
        const product_id = id;
        console.log('Pid delete :' + product_id);
        const url = "deleteCart";
        const method = "POST";
        const body = `product_id=${product_id}`;
        return API(url, method, body)
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.status == 200) {
                    this.setState({ update: 1, isloading: true });
                    this.getCartData();
                    ContextVal.state.count= responseJson.total_carts;
                    
                    //console.log(responseJson.status);
                    try {
                        AsyncStorage.setItem('@user_cartcount', '' + responseJson.total_carts);
                    } catch (error) {
                        console.log(error);
                    }
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
        //console.log(pid + ' ' + qty);
        const url = "editCart";
        const method = "POST";
        body = `product_id=${pid}&quantity=${qty}`;
        return API(url, method, body)
            .then(responseJson => {
                //console.log(responseJson);
                this.getCartData();
                if (responseJson.status == 200) {
                    //console.log(responseJson.status);

                    this.setState({ update: 1 });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        console.log('My Cart Render'); console.disableYellowBox = true;
        const swipeoutBtns = [
            {
                text: 'Delete',
                onPress: () => (this.swipeHandleDelete(this.state.pid)),
                backgroundColor: 'red',
                color: 'white',
            }
        ];



        const Data = 
        <View style={{flex:1}}>
            <View style={{flex:10}}>
            <FlatList
                data={this.state.dataSource}
                extraData={this.state.rowIndex}
                renderItem={({ item, index }) => {

                    return (
                        <CartContext.Consumer>
                            {ContextVal => (
                                <Swipeout
                                    right={swipeoutBtns} backgroundColor={'white'}
                                    onOpen={() => (this.onSwipeOpen(index, item.product.id))}
                                    close={this.state.rowIndex !== index}
                                    onClose={() => (this.onSwipeClose(index, item.product.id))}
                                    rowIndex={index}
                                    sectionId={0}
                                    autoClose={true}
                                >
                                    <View style={{width:'100%',marginLeft:10,}}>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginRight: 10, }}>
                                            <Image
                                                style={{ height: hp('12%'), width: wp('20%'), margin: 8, }}
                                                source={{ uri: item.product.product_images }} resizeMode='stretch' />
                                            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5, }}>
                                                <Text style={{ fontSize: hp('2.5%'), marginTop: 10, fontWeight: "bold", }}> {item.product.name}</Text>
                                                <View style={{ flex:1,flexDirection: 'row' }}>
                                                    <View style={{flex:1}}>
                                                        <Text style={{ fontSize: hp('2%'), }}>( {item.product.product_category} )</Text>
                                                    </View>
                                                    <View style={{flex:2}}>
                                                        <Text style={{ fontSize: hp('3%'),  paddingTop: 10, fontWeight: "bold", }}>Rs. {item.product.sub_total}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', flex:1 }}>
                                                    <NumericInput
                                                        //value={item.quantity}
                                                        initValue={item.quantity}
                                                        //onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                                        totalWidth={hp('10%')}
                                                        totalHeight={hp('4%')}
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
                                                    <View style={{ marginLeft: wp('40%') }}>
                                                        <TouchableOpacity onPress={() => this.swipeHandleDelete(item.product.id, ContextVal)}>
                                                            <Icon style={{ color: 'red' }} name="md-trash" size={hp('5%')} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '90%', height: 1, backgroundColor: 'gray', marginTop: 5, }}>

                                        </View>
                                    </View></Swipeout>
                            )}
                        </CartContext.Consumer>
                    );

                }

                }
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
            <View style={styles.boxend}>
                <View style={{ flexDirection: 'row', margin: 10, }}>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddAddress')}>
                        <Text style={styles.Textbutton}>ORDER NOW</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('4%'), fontWeight: "bold", }}> Rs. {this.state.cartTotal} </Text>

                </View>
            </View>
        </View>
        
        const Empty = <View style={{marginTop:250, alignItems: 'center',justifyContent:'center',alignSelf:'center' }}>
            <Image source={require("../images/CartEmpty.jpg")} />
            <Text style={{ marginLeft: 5, fontSize: hp('6%'), }}>Cart Empty!</Text>
        </View>

        let show = '';
        if (this.state.cartStatus == 1) {
            show = Data
        }
        else {
            show = Empty
        }

        if(this.state.isloading){
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                <Image source={require("../images/Loader1.gif")} />
                </View>
              )
          }

        return (
            <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, }}>
                {show}
            </View>
            </SafeAreaView>
        );
    }
}
export default withNavigation(MyCart);