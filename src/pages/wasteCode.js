import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,Modal} from 'react-native';
import R from '../R';
import style from '../Styles'
import { TouchableHighlight } from 'react-native-gesture-handler';


export default class ProductDetails extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [],
            productImages: [],
           // product_category_id: 1,
            category: "Tables",
            largeImage: "",
            quantityModalVisible: false,
            ratingModalVisible: false
        };
    }

    setQuantityModalVisible(visible){
        this.setState({quantityModalVisible: visible});
    }

    setRatingModalVisible(visible){
        this.setState({ratingModalVisible: visible});
    }
    
    
    id =  1

     static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("productName", "Center Coffee Table")
      });

    componentDidMount(){
        const { navigation } = this.props;
        const product_id = navigation.getParam("productID", "1")
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${product_id}`)
        .then((response)=> response.json())
        .then((responseJson)=>{
            this.setState({
                datasource: responseJson.data,
                productImages: responseJson.data.product_images,
                largeImage: responseJson.data.product_images[0].image
            })
        })
        .catch((error)=> {
            console.error(error)
        })
    }
   

    categoryChange(){
        
        if(this.state.datasource.product_category_id == 1) {
            return <Text>Category - Tables</Text>
        } else if (this.state.datasource.product_category_id == 2){
            return<Text>Category - Chairs</Text>
        } else if (this.state.datasource.product_category_id == 3) {
            return <Text>Category - Sofas</Text>
        }
    }

    renderImages(){
        return this.state.productImages.map(item=> {
            return(
                <TouchableOpacity onPress={()=>this.setState({largeImage: item.image})}>
                    <Image style={{width: 78, height: 69, marginTop: 20,margin: 5,borderColor: 'black',borderWidth: 1}} source= {{uri: item.image}}/>
                </TouchableOpacity>
            );
        }); 
    }

    renderLargeImage(){
        if (this.state.largeImage.length > 1) {
            return ( 
                <Image style={{width: 257, height: 178,alignItems: 'center', padding: 50}}
                source={{uri: this.state.largeImage}} />
            )
        }
    }

    

    
    render(){
        console.log(this.state.datasource)
        console.log(this.state.largeImage)
        console.log(this.state.product_category_id)
        
        //console.log(this.state.datasource.productImages[0].image)
        return(
            <View style={{flex: 1}}>
                <ScrollView nestedScrollEnabled>
                <Text style={{fontSize: 25, paddingLeft: 20, marginTop: 10, fontWeight: 'bold',color: '#262626'}}>{this.state.datasource.name}</Text>
                <Text style={{fontSize: 20, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.categoryChange()}</Text>
                <View style={{flexDirection: 'row'}}>
                    
                      <Text style={{fontSize: 14, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.state.datasource.producer}</Text>
                    
                   
                      <Text style={{paddingLeft: 280}}>{this.state.datasource.rating}</Text>
                    
                    </View>

                   
                        <View style={{ flexDirection: 'row',justifyContent: 'space-around',marginTop: 14}}>
                            <Text style={{color: '#FE4040',fontSize:25,paddingRight: 60}}>Rs.{this.state.datasource.cost}</Text>
                            <TouchableOpacity style={{paddingLeft: 90}}>
                                <Image source={R.images.share} />
                            </TouchableOpacity>
                        </View>
                

                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                          {this.renderLargeImage()}
                          </View>
                          <View style={{paddingLeft: 20}}>
                          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} nestedScrollEnabled>
                            {this.renderImages()}
                          </ScrollView>
                          
                        </View>

                        <View style={{marginTop: 20, marginRight: 20}}>
                          <Text style={{color: "#111111",fontWeight: 'bold',fontSize: 18, marginLeft: 20}}>DESCRIPTION:</Text>
                          <ScrollView nestedScrollEnabled> 
                          <Text style={{marginTop: 5, paddingLeft: 10,fontWeight: 'bold', color: '#333333',fontSize: 14, marginLeft: 10}}>{this.state.datasource.description}</Text>
                          </ScrollView>
                        </View>
                        </ScrollView>

                        <View style={{flexDirection: 'row',marginTop: 26,marginRight: 14,marginBottom:26,marginLeft: 14}}>
                            <Modal 
                            animationType="slide"
                            transparent={true}
                            visible={this.state.quantityModalVisible}>
                            
                            <View style={{flex:1}}>
                                <View style={{opacity: 0.5, flex: 6, backgroundColor: '#000'}}>
                                    <TouchableOpacity onPress={()=>this.setQuantityModalVisible(!this.state.quantityModalVisible)} style={{flex:1}}/>
                                </View>
                                                           
                                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff', height: 400 }}>
                                    
                                    <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                    <View style={{marginTop: 33}}>
                                    { this.renderLargeImage()} 
                                    </View> 
                                     
                                    <TextInput style={{fontSize: 20,padding: 20 }} placeholder="Enter Quantity" />
                                    
                                    <View style={{width: '70%', justifyContent:'center', alignItems: 'center'}}>
                                    <TouchableOpacity 
                                    style={{
                                        backgroundColor: 'red',borderRadius: 8,
                                        padding: 10,
                                        width: 176,height: 42,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={()=> {this.setQuantityModalVisible(!this.state.quantityModalVisible);}}>
                                        <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold', paddingBottom: 5}}>SUBMIT</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                </View>

                                
                            </Modal>
                            <TouchableOpacity style={{width: 160, height: 45,backgroundColor: '#E91C1A', borderRadius: 10}}
                            onPress={()=>{
                                this.setQuantityModalVisible(true);
                           }}>
                            
                                <Text style={{fontSize: 18, fontWeight: '500', color: '#FFFFFF', textAlign: 'center', paddingVertical: 10}}>BUY NOW</Text>
                            </TouchableOpacity>


                            <Modal 
                            animationType="slide"
                            transparent={true}
                            visible={this.state.ratingModalVisible}>
                            
                            <View style={{flex:1}}>
                                <View style={{opacity: 0.5, flex: 6, backgroundColor: '#000'}}>
                                    <TouchableOpacity onPress={()=>this.setRatingModalVisible(!this.state.ratingModalVisible)} style={{flex:1}}/>
                                </View>
                                                           
                                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff', height: 400 }}>
                                    
                                    <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                    <View style={{marginTop: 33}}>
                                    { this.renderLargeImage()} 
                                    </View> 
                                     
                                    {/ <TextInput style={{fontSize: 20,padding: 20 }} placeholder="Enter Quantity" /> /}
                                    <Text>{this.state.datasource.rating}</Text>
                                    
                                    <View style={{width: '70%', justifyContent:'center', alignItems: 'center'}}>
                                    <TouchableOpacity 
                                    style={{
                                        backgroundColor: 'red',borderRadius: 8,
                                        padding: 10,
                                        width: 176,height: 42,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={()=> {this.setRatingModalVisible(!this.state.ratingModalVisible);}}>
                                        <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold'}}>RATE NOW</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                </View>

                                
                            </Modal>


                            <TouchableOpacity style={{marginLeft: 10, width: 160, height: 45, backgroundColor: '#9C908F',borderRadius: 10,alignContent: 'center', marginRight: 10,marginLeft: 20}}
                            onPress={()=>{
                                this.setRatingModalVisible(true);
                           }}>
                                <Text style={{fontSize: 18, fontWeight: '500',color: '#5C5858', textAlign: 'center', paddingVertical: 10}}>RATE</Text>
                            </TouchableOpacity>
                        </View>

            </View>                
        )
    }

    
}