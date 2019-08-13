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
import Icon from '@expo/vector-icons/Ionicons';
import { withNavigation } from "react-navigation";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MenuDrawer extends Component {
    navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: 50, width:300, }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
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
            const count = await AsyncStorage.getItem("@user_cartcount");
            this.setState({ email: email, name: fname + " " + lname, iscart: cart,count:count });
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
                                <Image style={styles.img} source={this.state.image != null? this.state.image : require('../images/profile.jpg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileText}>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={{ fontSize: 15, paddingBottom: 5, color: 'white', textAlign: 'left', }}>{this.state.email}</Text>
                        </View>
                    </View>
                </View>
                {/*<ScrollView style={styles.scroller}>*/}
                <View style={styles.bottomLinks}>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-cart" size={25}/>
                        {/*this.navLink('MyCart', 'My Cart')*/}
                        <TouchableOpacity style={{ height: 50, paddingRight:120, }} onPress={() => this.props.navigation.navigate('MyCart',{cart:this.state.iscart})}>
                            <Text style={styles.link}>My Cart</Text>
                        </TouchableOpacity>
                        <View style={{height:35,width:35, borderRadius:20,backgroundColor:'red',alignItems:'center',justifyContent:'center', position:'absolute',right:15,bottom:15,zIndex:2000,}}>
                            <Text style={{margin:8,color: 'white',fontWeight:'bold', fontSize: 20,}}>{this.state.count}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/tables_icon.png')} />
                        {this.navLink('Table', 'Tables')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/sofa.png')} />
                        {this.navLink('Sofas', 'Sofas')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/chair.png')} />
                        {this.navLink('Chairs', 'Chairs')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.imgIcon} source={require('../images/cupboard.png')} />
                        {this.navLink('Cupboards', 'Cupboards')}
                    </View>
                    <View style={styles.SectionStyle}>
                    <Icon style={{ color: '#ffffff' }} name="md-person" size={25}/>
                        {this.navLink('MyAccount', 'My Account')}
                    </View>
                    <View style={styles.SectionStyle}>
                    <Icon style={{ color: '#ffffff' }} name="md-globe" size={25}/>
                        {this.navLink('StoreLocator', 'Store Locator')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-basket" size={25}/> 
                        {this.navLink('MyOrders', 'My Orders')}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Icon style={{ color: '#ffffff' }} name="md-exit" size={25}/>
                        <TouchableOpacity style={{ height: 50,width:300, }} onPress={() => this.userLogout()}>
                            <Text style={styles.link}>Logout</Text>
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
        //margin: 10,
        //backgroundColor: 'rgba(255,255,255,0.3)',
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
        fontSize: 20,
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
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    imgIcon: {
        height: 25,
        width: 25,
    },
    topLinks: {
        height: 200,
        backgroundColor: 'black',
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 450,
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
        color: 'white',
    }
})

export default withNavigation(MenuDrawer);