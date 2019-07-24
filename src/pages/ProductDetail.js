import React, { Component } from 'react';
import {
    StyleSheet,
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



export default class Table extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('pname', 'Product Detail'),
            headerTintColor: '#fff',
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
            headerRight: null,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }

    }

    componentDidMount() {
        const { navigation } = this.props;
        const pid = navigation.getParam("pid", "1");
        fetch('http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=7')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const pcat = this.state.dataSource.product_category_id;
        let pcatval = " ";
        if (pcat == 1) {
            pcatval = "Table";
        }
        else if (pcat == 2) {
            pcatval = "Chair";
        }
        else if (pcat == 3) {
            pcatval = "Sofa";
        }
        else {
            pcatval = "Cupboard";
        }

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const ratingObj = {
            ratings: this.state.dataSource.rating,
            views: this.state.dataSource.view_count
          }

        return (

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#e8e4e3" }}>
                {/*<Text>{this.state.dataSource.name}</Text>
                <Text>{this.state.dataSource.description}</Text>
                <Text>{this.state.dataSource.cost}</Text>
                <Text>{this.props.navigation.state.params.pid}</Text>

                 <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => {

                        return <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail')}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>


                                <View style={{ flexDirection: 'column', margin: 15, }}>
                                    <Text style={{ fontSize: 20, }}>{item.name}</Text>
                                    <Text>{item.producer}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text
                                            style={{ marginTop: 5, marginRight: 100, color: 'red', fontSize: 20 }}>
                                            Rs. {item.cost}
                                        </Text>

                                    </View>
                                </View>
                            </View></TouchableOpacity>
                    }
                    }
                    keyExtractor={({ id }, index) => id}
                /> */}

                {/*Actual Design Layout of Product detail*/}
                <View style={styles.box}>
                    <Text style={{ fontSize: 25, paddingLeft: 20, marginTop: 10, fontWeight: "bold", }}>{this.props.navigation.state.params.pname}</Text>
                    <Text style={{ fontSize: 20, paddingLeft: 20, }}>Category - {pcatval}</Text>
                    <View style={{ flex: 0, flexDirection: 'row',width: 420, }}>
                        <View style={{ flex: 0, flexDirection: 'column',}}>
                            
                            <Text style={{ fontSize: 15, paddingLeft: 20, marginBottom: 10 ,marginRight:250}}>{this.state.dataSource.producer}</Text>
                        </View>
                        <View style={{ flexDirection:'row-reverse',}}>
                            <StarRating ratingObj={ratingObj}/>
                        </View>
                        
                    </View>

                </View>
                <View style={styles.boxmid}>
                    <View style={{ flex: 0, flexDirection: 'row', marginTop: 5, marginLeft: 5, }}>
                        <Text style={{ marginTop: 5, marginRight: 100, color: 'red', fontSize: 25 }}>Rs. {this.state.dataSource.cost}</Text>
                        <Icon
                            style={{ paddingLeft: 120, color: '#9c908f' }}
                            onPress={() => navigation.pop()}
                            name="md-share"
                            size={30}
                        />
                    </View>
                    <View style={styles.image}>
                        <Image
                            style={{ height: 150, width: 300, marginTop: 5, }}
                            source={this.state.dataSource.product_images[1].image}
                        />
                        <View style={{ flex: 0, flexDirection: 'row', alignContent: 'center' }}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.imageThumb}
                                    source={require("../images/slider_img1.jpg")}
                                /></TouchableOpacity>
                            <TouchableOpacity><Image
                                style={styles.imageThumb}
                                source={require("../images/slider_img1.jpg")}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.imageThumb}
                                    source={require("../images/slider_img1.jpg")}
                                /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0, }}>
                        <Text style={{ marginTop: 5, paddingLeft: 10, color: 'black', fontSize: 20, fontWeight: "bold", }}> DESCRIPTION</Text>
                        <Text style={{ marginTop: 2, paddingLeft: 10, color: 'black', fontSize: 15, }}> {this.state.dataSource.description}</Text>
                    </View>
                </View>
                <View style={styles.boxend}>
                    <View style={{ flexDirection: 'row', margin: 10, }}>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Text style={styles.Textbutton}>BUY NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRate} onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Text style={styles.TextbuttonRate}>RATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        flex: 0,
        width: 420,
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    boxmid: {
        flex: 0,
        width: 400,
        height: 425,
        backgroundColor: '#ffffff',
        borderRadius: 10,

    },
    image: {
        alignItems: "center",
    },
    imageThumb: {
        height: 80,
        width: 120,
        margin: 5,
        borderColor: 'black'
    },
    boxend: {
        flex: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        width: 190,
        height: 45,
        backgroundColor: '#e91c1a',
        borderRadius: 10,
    },
    buttonRate: {
        marginLeft: 10,
        width: 190,
        height: 45,
        backgroundColor: '#9c908f',
        borderRadius: 10,
        alignContent: "center",
    },
    Textbutton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 10,
    },
    TextbuttonRate: {
        fontSize: 18,
        fontWeight: '500',
        color: '#5c5858',
        textAlign: 'center',
        paddingVertical: 10,
    },
})