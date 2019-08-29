import React, { Component } from 'react';
import CartContext from '../context/CartContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
    Image,
    StyleSheet,
} from 'react-native';
class ProfileImage extends Component {
    state = {}
    render() {
        return (
            <CartContext.Consumer>
                {userVal => {
                    return (
                        <Image style={styles.img} source={userVal.state.profile != '' ? { uri: userVal.state.profile } : require('../images/profile.jpg')} />
                    );
                }}
            </CartContext.Consumer>
        );
    }
}
const styles= StyleSheet.create({
    img: {
        height: hp('10%'),
        width: hp('10%'),
        borderRadius: 35,
        borderColor: '#ffffff',
        borderBottomWidth:50,
    },
})

export default ProfileImage;