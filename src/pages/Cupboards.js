import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
 } from 'react-native';

 import StarRating from '../components/StarRating';
 import ProductDetail from './ProductDetail';
 import Icon from '@expo/vector-icons/Ionicons';

 export default class Cupboards extends Component {
    static navigationOptions = {
        title: 'Cupboards',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
          },
      };

      constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
    
      componentDidMount(){
        return fetch('http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=4')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }
    render(){

        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }

        return(
            
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                data={this.state.dataSource}
                renderItem={({item}) =>{
                    const ratingObj = {
                      ratings: item.rating,
                      views: item.view_count
                    }
                    return <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail',{ pname:item.name, pid:item.id })}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image 
                                style={{ height: 90, width: 90,margin:10, }}
                                source={{uri:item.product_images}} />
                    
                            <View style={{flexDirection:'column', margin:15,}}>
                                <Text style={{fontSize: 20,}}>{item.name}</Text>
                                <Text>{item.producer}</Text>
                                <View style={{flexDirection:'row',}}>
                                    <Text style={{marginTop:5,marginRight:100,color:'red',fontSize:20}}>Rs. {item.cost}</Text>
                                    <StarRating ratingObj={ratingObj}/>
                                </View>
                            </View>
                        </View></TouchableOpacity>
                }
            }
                keyExtractor={({id}, index) => id}
                />
            </View>
        )
    }
}