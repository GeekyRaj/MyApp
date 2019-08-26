import React, { Component, } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  YellowBox,
  AsyncStorage,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { background } from '../components/slider';
import style from '../Styles';

const DEVICE_WIDTH = Dimensions.get("window").width;
export default class DashboardScreen extends Component {
  scrollRef = React.createRef();
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
      selectedIndex: 0,
      isLoaded: false,
    }
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      this.setState({
        item: await AsyncStorage.getItem('@user_at'),
        fname: await AsyncStorage.getItem('@user_fname'),
        isloaded: true,
      })
      console.log('\n *** HOME ***')
    } catch (e) {
      console.log(e);
    }
    console.log('Stored value : ', this.state.item, ' Fname ', this.state.fname);
  }

  componentDidMount = ()=> {
    setInterval(() =>{
      this.setState(prev =>({ selectedIndex: prev.selectedIndex === background.length - 1 ? 0 : prev.selectedIndex + 1 }),
      ()=>{
          this.scrollRef.current.scrollTo({
            animated : true,
            y: 0,
            x: DEVICE_WIDTH * this.state.selectedIndex
          })
      })
    },3000)
  }
  
  setSelectedIndex = event => {
    //width of the viewsize
    const viewsize = event.nativeEvent.layoutMeasurement.width;
    //get current position of scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewsize);
    this.setState({ selectedIndex : selectedIndex});
  }

  render() {
    YellowBox.ignoreWarnings(["Warning: componentWillUpdate is deprecated"]);
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;
    let typewidth = dimensions.width / 2.3;
    let typeheight = dimensions.height / 3.9;
    //console.log(dimensions.height+' '+typeheight);
    const selectedIndex = this.state.selectedIndex;



    //const access_id= this.props.navigation.getParam("access_id",1);
    if(this.state.isloaded){
      return (

        <View style={{ flex: 1, }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            onMomentumScrollEnd = {this.setSelectedIndex}
            ref = {this.scrollRef}
            style={{
              height: 10,
            }}
          >
            {background.map((item, index) => (
              <View key={`img-${index}`}>
                <Image
                  style={{ height: imageHeight+10, width: imageWidth }}
                  source={item.slider}
                  resizeMode="stretch"
                />
              </View>
            ))}

          </ScrollView>
              {/* RENDER DOTS */}
          <View style={style.circleDiv}>
            {background.map((item, i) => (
              <View key={`item+${i}`} style={[style.whiteCircle, { opacity: i == selectedIndex ? 1 : 0.5 }]}></View>
            ))}
          </View>

          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', width: '100%',}}>
            <FlatList
              numColumns={2}
              data={[
                { key: 1, ur: require("../images/Table.png"), pth: 'Table' },
                { key: 3, ur: require("../images/Sofas.png"), pth: 'Sofas' },
                { key: 2, ur: require("../images/Chairs.png"), pth: 'Chairs' },
                { key: 4, ur: require("../images/Cupboards.png"), pth: 'Cupboards' },
              ]}
              renderItem={({ item }) => {

                return <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList', { name: item.pth, pid: item.key})}>
                  <Image
                    style={{ height: typeheight, width: typewidth, margin: 10, }}
                    source={item.ur}
                    resizeMode="stretch" />
                </TouchableOpacity>
              }
              }
              keyExtractor={
                (item, index) => index.toString()
              }
            />
          </View>

        </View>
      );
    }
    return (
      <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
      <Image source={require("../images/Loader1.gif")} />
      </View>
    )
  }
}
