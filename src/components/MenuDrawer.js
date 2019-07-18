import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    ScrollView,
 } from 'react-native';

 const WIDTH = Dimensions.get('window').width;
 const HEIGHT = Dimensions.get('window').height;

 export default class MenuDrawer extends Component {
    navLink(nav, text) {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: 'gray' }}>
                
                <View style={styles.topLinks}>
                        <View style={styles.profile}>
							<View style={styles.imgView}>
								{/*<Image style={styles.img} source={require('./src/image/profile.jpg')} />*/}
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>Hays Stanford</Text>
							</View>
						</View>
               </View>
               <ScrollView style={styles.scroller}>
                <View style={styles.bottomLinks}>
                    {this.navLink('DashBoard','HOME')}
                    {this.navLink('MyCart','My Cart')}
                    {this.navLink('Table','Tables')}
                    {this.navLink('Sofas','Sofas')}
                    {this.navLink('Chairs','Chairs')}
                    {this.navLink('Cupboards','Cupboards')}
                    {this.navLink('MyAccount','My Account')}
                    {this.navLink('StoreLocator','Store Locator')}
                    {this.navLink('MyOrders','My Orders')}
                    {this.navLink('LogOut','My Logout')}
                    </View>
                    </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroller: {
		flex: 1,
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
		borderRadius: 50,
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