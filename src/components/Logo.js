import React, {Component} from 'react';
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
                            paddingVertical: 16,
                            flexDirection:'row'}}>
                    <Text style={{fontSize : 38,fontWeight:'500',color: 'rgba(255,255,255,100)',marginTop :50}}>Neo</Text>
                    <Text style={{fontSize : 38,color: 'rgba(255,255,255,100)',fontWeight:'500',}}>STORE</Text>
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