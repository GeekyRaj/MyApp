import React, {Component} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, 
    Text,
    View,
    Image, 
} from 'react-native';


export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={{ 
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingVertical: 20,
                            flexDirection:'row',
                            marginBottom:15,}}>
                    <Text style={{fontSize : hp('6%'),fontWeight:'500',color: 'rgba(255,255,255,100)',}}>Neo</Text>
                    <Text style={{fontSize : hp('6%'),color: 'rgba(255,255,255,100)',fontWeight:'500',}}>STORE</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent : 'flex-end',
        alignItems: 'center',
    },
    LogoText: {
        fontSize : 22,
        color: 'rgba(255,255,255,0.7)'
    }
  });