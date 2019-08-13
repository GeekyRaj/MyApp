import React, { Component, } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  YellowBox,
  AsyncStorage
} from 'react-native';
import { background } from '../components/slider';
export default class DashboardScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'NeoSTORE',
    headerStyle: {
      backgroundColor: '#e91c1a',
    },
    headerTintColor: '#fff',
  });

  constructor() {
    super();
    this.state = {
      token: ' ',
      fname: ' ',
      dataSource: [],
    }
    this._retrieveData();
  }

    _retrieveData = async () => {
      try {
        this.setState({
          item: await AsyncStorage.getItem('@user_at'),
          fname: await AsyncStorage.getItem('@user_fname')
        })
        console.log('\n *** HOME ***')
      } catch (e) {
        console.log(e);
      }
      console.log('Stored value : ', this.state.item, ' Fname ', this.state.fname);
    }

    renderDots(){
      return(
        <View style={{ flex:0, flexDirection:'row', alignItems:'center',  }}>
          <View style={{ flex:0, backgroundColor: 'gray', borderRadius: 8, width:8, height:8,marginRight:6,}}></View>
          <View style={{ flex:0, backgroundColor: '#e8e3e3', borderRadius: 8, width:8, height:8,marginRight:6,}}></View>
          <View style={{ flex:0, backgroundColor: '#e8e3e3', borderRadius: 8, width:8, height:8,marginRight:6,}}></View>
          <View style={{ flex:0, backgroundColor: '#e8e3e3', borderRadius: 8, width:8, height:8,marginRight:6,}}></View>
        </View>
      )
    }

  render() {
    YellowBox.ignoreWarnings(["Warning: componentWillUpdate is deprecated"]);
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;
    let typewidth= dimensions.width/2.3;
    let typeheight = dimensions.height/4.3;
    //console.log(dimensions.height+' '+typeheight);
  


    //const access_id= this.props.navigation.getParam("access_id",1);

    return (

      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center',}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled= {true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{
            height: 230,
          }}
        >
          {background.map((item,index) => (
            <View key ={`img-${index}`}>
              <Image
              style={{ height: imageHeight, width: imageWidth }}
              source={item.slider}
            />
            </View>
          ))}
              
          </ScrollView>
          {this.renderDots()}
        
        <FlatList
          numColumns={2}
          data={[
            { key: 1, ur: require("../images/Table.png"), pth: 'Table' },
            { key: 2, ur: require("../images/Sofas.png"), pth: 'Sofas' },
            { key: 3, ur: require("../images/Chairs.png"), pth: 'Chairs' },
            { key: 4, ur: require("../images/Cupboards.png"), pth: 'Cupboards' },
          ]}
          renderItem={({ item }) => {
            // const p = item.pth;
            return <TouchableOpacity  onPress={() => this.props.navigation.navigate(item.pth)}>
              <Image
                style={{ height: typeheight, width: typewidth, margin: 10, }}
                source={item.ur} />
            </TouchableOpacity>
          }
          }
          keyExtractor={
            (item, index) => index.toString()
          }
        />

      </View>
    );
  }
}