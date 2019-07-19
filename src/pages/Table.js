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
                <Text>Table</Text>
                <FlatList 
                numColumns={1}
                data={[
                    require("../images/Table.png"),
                    require("../images/Sofas.png"),
                    require("../images/Chairs.png"),
                    require("../images/Cupboards.png"),
                ]}
                renderItem={({item}) =>{
                    return <View style={{flex:1,flexDirection:'row'}}><TouchableOpacity onPress={() => this.props.navigation.navigate('Table')}>
                        <Image 
                            style={{ height: 90, width: 90,margin:5, }}
                            source={item} />
                    </TouchableOpacity>
                    <View style={{flexDirection:'column', margin:15,}}>
                        <Text style={{fontSize: 20,}}>Stylish Modern Dining Table</Text>
                        <Text>Aron Table Center</Text>
                        <View style={{flexDirection:'row',}}>
                            <Text style={{marginTop:5,marginRight:100,color:'red',fontSize:20}}>Rs. 25,000</Text>
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