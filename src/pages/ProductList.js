import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import NumberFormat from 'react-number-format';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from '../components/StarRating';
import API from '../components/API';
import Icon from '@expo/vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

//type Props = {};

export default class ProductList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', 'Products'),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: null,
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
        };
    };

    constructor(props) {
        super(props);
        this.state = { isloaded: true,}
    }

    componentDidMount() {
        const cid = this.props.navigation.getParam('pid', '2');
        const url = `products/getList?product_category_id=${cid}`;
        return API(url, null, null)
            .then((responseJson) => {

                this.setState({
                    isloaded: false,
                    dataSource: responseJson.data,
                }, function () { });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {

        let dimensions = Dimensions.get("window");
        screenW = dimensions.width - 10;
        screenH = dimensions.height - 10;
        console.log(screenW + ' ' + screenH);

        if(this.state.isloaded){
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                <Image source={require("../images/Loader1.gif")} />
                </View>
              )
        }
        


        return (

            <View style={{ flex: 1, paddingTop: 20, height: screenH, width: screenW }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => {
                        const ratingObj = {
                            ratings: item.rating,
                            views: item.view_count
                        }
                        return <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('ProductDetail', { pname: item.name, pid: item.id })}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image
                                    style={{ height: hp('12%'), width: wp('20%'), margin: 15, }}
                                    source={{ uri: item.product_images }}
                                    resizeMode='stretch' />

                                <View style={{ flex: 1, flexDirection: 'column', margin: 15, }}>
                                    <Text style={{ fontSize: hp('2.5%'),fontWeight:'bold' }}>{item.name}</Text>
                                    <Text style={{ fontSize: hp('2%'), }}>{item.producer}</Text>
                                    <View style={{flex:1, flexDirection: 'row', }}>
                                        <View style={{flex:8}}>
                                            <NumberFormat 
                                                value={item.cost} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'\u20B9 ' } 
                                                renderText={
                                                    value=><Text style={{ marginTop: 5, color: 'red', fontSize: hp('3%'), fontWeight:'bold' }}>{value}</Text>} 
                                            />
                                        </View>
                                        <View style={{flex:4}}>
                                            <StarRating ratingObj={ratingObj} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '95%', height: 1, backgroundColor: 'gray', marginLeft: 5, }}></View>
                        </TouchableOpacity>
                    }
                    }
                    keyExtractor={
                        (item, index) => index.toString()
                    }
                />
            </View>
        )
    }
}
