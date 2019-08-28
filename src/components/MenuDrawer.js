import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '@expo/vector-icons/Ionicons';
import { withNavigation } from "react-navigation";
import ProfileImage from '../components/ProfileImage';
import style from '../Styles';
import CartCount from './CartCount';
import CartContext from '../context/CartContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MenuDrawer extends Component {
    navLink(nav, text) {
        return (
            <TouchableOpacity style={style.MenuTouch} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={style.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    navType(pth, key) {
        return (
            <TouchableOpacity style={style.MenuTouch} onPress={() => this.props.navigation.navigate('ProductList', { name: pth, pid: key })}>
                <Text style={style.link}>{pth}</Text>
            </TouchableOpacity>
        )
    }

    constructor() {
        super();
        this.state = {
            token: ' ',
            name: ' ',
            email: ' ',
            iscart: ' ',
            count: '2',
            image: null,
        }

        this.getData();
    }

    async userLogout() {
        try {
            await AsyncStorage.clear();
            {
                this.props.navigation.navigate('LogOut');
            }
        } catch (e) {
            console.log("Error Clearing user data" + e);
        }
        console.log("User Data cleared.");
    }

    async getData() {
        try {
            const email = await AsyncStorage.getItem("@user_email");
            const cart = await AsyncStorage.getItem("@user_addcart");
            const fname = this.Capitalize(await AsyncStorage.getItem("@user_fname"));
            const lname = this.Capitalize(await AsyncStorage.getItem("@user_lname"));
            //const count = await AsyncStorage.getItem("@user_cartcount");
            this.setState({ email: email, name: fname + " " + lname, iscart: cart, });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.getData();
        });
        console.log('---- MenuDrawer Component Did Mounnt----');
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'gray' }}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.imgView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')}>
                                <ProfileImage/>
                            </TouchableOpacity>
                        </View>

                        <CartContext.Consumer>
                            {userVal => {
                                return (
                                    <View style={styles.profileText}>
                                        <Text style={styles.name}>{userVal.state.name}</Text>
                                        <Text style={{ fontSize: hp('2%'), paddingBottom: 5, color: 'white', textAlign: 'left', }}>{userVal.state.email}</Text>
                                    </View>);
                            }}
                        </CartContext.Consumer>


                    </View>
                </View>
                {/*<ScrollView style={styles.scroller}>*/}
                <View style={styles.bottomLinks}>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-cart" size={hp('4%')} />
                        {/*this.navLink('MyCart', 'My Cart')*/}
                        <TouchableOpacity style={style.MenuTouch} onPress={() => this.props.navigation.navigate('MyCart', { cart: this.state.iscart })}>
                            <Text style={style.link}>My Cart</Text>
                        </TouchableOpacity>
                        <CartCount />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/tables_icon.png')} resizeMode="stretch" />
                        {/* {this.navLink('Table', 'Tables')} */}
                        {this.navType('Tables', '1')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/sofa.png')} />
                        {/* {this.navLink('Sofas', 'Sofas')} */}
                        {this.navType('Sofas', '3')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/chair.png')} />
                        {/* {this.navLink('Chairs', 'Chairs')} */}
                        {this.navType('Chairs', '2')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/cupboard.png')} />
                        {/* {this.navLink('Cupboards', 'Cupboards')} */}
                        {this.navType('Cupboards', '4')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-person" size={hp('4%')} />
                        {this.navLink('MyAccount', 'My Account')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-globe" size={hp('4%')} />
                        {this.navLink('StoreLocator', 'Store Locator')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-basket" size={hp('4%')} />
                        {this.navLink('MyOrders', 'My Orders')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-exit" size={hp('4%')} />
                        <TouchableOpacity style={style.MenuTouch} onPress={() => this.userLogout()}>
                            <Text style={style.link}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*</ScrollView>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroller: {
        flex: 1,
        height: 100,
    },
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        paddingLeft: 16,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: hp('3.5%'),
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left',
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    img: {
        height: hp('10%'),
        width: hp('10%'),
        borderRadius: 35,
    },
    imgIcon: {
        height: hp('3.5%'),
        width: hp('3.5%'),
    },
    topLinks: {
        height: hp('25%'),
        backgroundColor: 'black',
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 450,
    },
})

export default withNavigation(MenuDrawer);