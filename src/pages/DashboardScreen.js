import React, { Component, } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  YellowBox,
  AsyncStorage
} from 'react-native';

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
    }

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

    async getData() {
      const token = await AsyncStorage.getItem("@user_at");
      const fetchConfig = {
          method: "GET",
          headers: {
              access_token: token,
              "Content-Type": "application/x-www-form-urlencoded"
          }
      };
      return fetch(
          `http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`,
          fetchConfig
      )
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  dataSource: responseJson.data.user_data
              });
              //console.log(responseJson);
              console.log(this.state.dataSource.profile_pic);
              try {
                  AsyncStorage.setItem('@user_profile', this.state.dataSource.profile_pic);
              } catch (error) {
                  // Error saving data
              }
          })
          .catch(error => {
              console.error(error);
          });
  }

  async componentDidMount() {
    console.log('Home DidMount Method');
    this.getData();
}

  render() {
    YellowBox.ignoreWarnings(["Warning: componentWillUpdate is deprecated"]);
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;
    let typewidth= dimensions.width/2.3;
    let typeheight = dimensions.height/4.3;
    console.log(dimensions.height+' '+typeheight);
  


    //const access_id= this.props.navigation.getParam("access_id",1);

    return (

      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
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
            { key: 1, ur: require("../images/Table.png"), pth: 'Table' },
            { key: 2, ur: require("../images/Sofas.png"), pth: 'Sofas' },
            { key: 3, ur: require("../images/Chairs.png"), pth: 'Chairs' },
            { key: 4, ur: require("../images/Cupboards.png"), pth: 'Cupboards' },
          ]}
          renderItem={({ item }) => {
            const p = item.pth;
            return <TouchableOpacity key={item.key} onPress={() => this.props.navigation.navigate(p)}>
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