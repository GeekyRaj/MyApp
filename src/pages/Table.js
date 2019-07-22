import React, {Component} from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Image,
 } from 'react-native';

 import StarRating from '../components/StarRating';

 export default class Table extends Component {
    static navigationOptions = {
        title: 'Tables',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList 
                numColumns={1}
                data={[
                    {key:require('../images/Table.png'),pth:'Table',pname:'Stylish Modern Dining Table',center:'Aron Table center',price:'27,000'},
                    {key:require("../images/Sofas.png"),pth:'Sofas',pname:'4 Seater Dinning Table',center:'Future Furniture center',price:'25,000'},
                    {key:require("../images/Chairs.png"),pth:'Chairs',pname:'6 Seater Dinning Table',center:'Aron Table center',price:'30,000'},
                    {key:require("../images/Cupboards.png"),pth:'Cupboards',pname:' Stylish 4 Seater Dinning Table',center:'Aron Table center',price:'35,000'},
                    {key:require("../images/Cupboards.png"),pth:'Cupboards',pname:' Stylish 4 Table',center:'Aron Table center',price:'10,000'},
                    {key:require("../images/Cupboards.png"),pth:'Cupboards',pname:' Harkness Table for Office',center:'Future Table center',price:'40,000'},
                ]}
    
                renderItem={({item}) =>{
                    const p=item.pth;
                    return <View style={{flex:1,flexDirection:'row'}}><TouchableOpacity onPress={() => this.props.navigation.navigate(p)}>
                        <Image 
                            style={{ height: 90, width: 90,margin:5, }}
                            source={item.key} />
                    </TouchableOpacity>
                    <View style={{flexDirection:'column', margin:15,}}>
                        <Text style={{fontSize: 20,}}>{item.pname}</Text>
                        <Text>{item.center}</Text>
                        <View style={{flexDirection:'row',}}>
                            <Text style={{marginTop:5,marginRight:100,color:'red',fontSize:20}}>Rs. {item.price}</Text>
                            <StarRating/>
                    </View>
                    </View>
                    
                    </View>
                }
            }
            keyExtractor={
                (index) => {return index }
            }
            />
            </View>
        )
    }
}