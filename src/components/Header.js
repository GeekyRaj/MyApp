import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
 } from 'react-native';
 import Icon from '@expo/vector-icons/Ionicons';

 export default class Header extends Component{
     render() {
         return (
             <View style={{ height:90,flexDirection:'row', justifyContent: 'flex-start', alignItems:'center'}}>
                 <TouchableOpacity
                 style={{ marginLeft:10, margfinTop: 20}}
                 onPress={()=>{ const{ navigate}= this.props.navigation; navigate('DrawerOpen');}}>
                
                <Icon
                    style={{ paddingLeft: 16 , color: '#e91c1a'}}
                    onPress={() => navigation.openDrawer()}
                    name="md-menu"
                    size={30}
                />
                 </TouchableOpacity>
             </View>

         );
     }
 }