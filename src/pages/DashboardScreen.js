import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
 } from 'react-native';
 import Icon from '@expo/vector-icons/Ionicons';
import { Row } from 'native-base';
import Sofas from './Sofas';
import Chairs from './Chairs';
import Cupboards from './Cupboards';
import Table from './Table';
 const { width } = Dimensions.get('window');

 export default class DashboardScreen extends Component {
    static navigationOptions = {
      title: 'NeoSTORE',
      headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };
    render() {
        let dimensions = Dimensions.get("window");
        let imageHeight = Math.round((dimensions.width * 9) / 16);
        let imageWidth = dimensions.width;
      return (
        <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView horizontal={true}
          //contentContainerStyle={{height: imageHeight}}
          style={{
            height: 240,
          }}
                    >
            <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={require("../images/slider_img1.jpg")}
            />
            <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={require("../images/slider_img2.jpg")}
            />
            <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={require("../images/slider_img3.jpg")}
            />
            <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={require("../images/slider_img4.jpg")}
            />
          </ScrollView>
            <FlatList 
                numColumns={2}
                data={[
                    require("../images/Table.png"),
                    require("../images/Sofas.png"),
                    require("../images/Chairs.png"),
                    require("../images/Cupboards.png"),
                ]}
                renderItem={({item}) =>{
                    return <TouchableOpacity onPress={() => this.props.navigation.navigate('Table')}><Image 
                    style={{ height: 160, width: 180,margin:10, }}
                    source={item} /></TouchableOpacity>
                }
            }
            keyExtractor={
                (index) => {return index }
            }
            />
            {/*Tried Calling link And image with same props passed
            <FlatList 
                numColumns={2}
                data={[
                    {
                        id: 'Table',
                        ur: 'require("../images/Table.png")'
                    },
                    {
                        id: 'Sofas',
                        ur: 'require("../images/Sofas.png")'
                    },
                    {
                        id: 'Chairs',
                        ur: 'require("../images/Chairs.png")'
                    },
                    {
                        id: 'Cupboards',
                        ur: 'require("../images/Cupboards.png")'
                    },
                ]}
                renderItem={({item}) =>{
                    //const p={item.id},
                    return <TouchableOpacity onPress={() => this.props.navigation.navigate('Table')}><Image 
                    style={{ height: 160, width: 180,margin:10, }}
                    source={item.ur}/></TouchableOpacity>
                }
            }
            keyExtractor={
                (index) => {return index }
            }
        />*/}
        </View>
      );
    }
  }