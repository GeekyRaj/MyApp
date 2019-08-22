import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    //Text input
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        height: hp('5.5%'),
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
    },
    inputBox: {
        flex: 1,
        height: hp('5.8%'),
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: hp('2%'),
        color: '#ffffff',
        marginVertical: 5,
    },

    //White Button with Red Text
    WhiteButton: {
        width: wp('80%'),
        height: hp('5%'),
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    },
    WhiteTextbutton: {
        fontSize: hp('2.1%'),
        fontWeight: '500',
        color: '#E91c1a',
        textAlign: 'center',
    },
    //ExpoIcon 
    Expoicon: { 
        paddingLeft: 16, 
        color: '#ffffff' 
    },
    //Login & Sigmup bottom navigation
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: hp('2.3%'),
    },
    signupButton: {
        color: '#ffffff',
        fontSize: hp('2.5%'),
        fontWeight: '500',
    },
    //Error validation
    error: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    //White Circle
    circleDiv: {
        position: 'absolute',
        width: '100%',
        height: hp('50%'),
        //bottom:50,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }, 
      whiteCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5,
        backgroundColor: 'white',
      },  
      //Mnu Draer Touchable opacity
      MenuTouch: { 
          height: hp('8%'), 
          paddingRight: 120, 
          paddingTop:5,
        } ,
        link: {
            flex: 1,
            fontSize: hp('3%'),
            padding: 6,
            paddingLeft: 14,
            margin: 5,
            textAlign: 'left',
            color: 'white',
        },
    //Star Rating
    StarContainer: {
		width: '100%',
        height: '70%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    Star:{
        padding:2,
        //marginLeft:1,
        width: wp('4%'),
        height: hp('2%')
    }
})
export default style;