import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
    ActivityIndicator,
    TouchableHighlight,
    ScrollView,
    Modal,
    Easing,
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
            headerRight: null
        };
    };

    //Modal 
    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    constructor(props) {
        super(props);
        this.state = {
            pid:0,
            isLoading: true,
            rating: [],
            addcart: [],
            dataSource: [],
            productImages: [],
            largeImage: "",
            quantityModalVisible: false,
            ratingModalVisible: false,

            Default_Rating: 2,
            //To set the default Star Selected
            Max_Rating: 5,
            //To set the max number of Stars
        };
        this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
        this.Star_With_Border = 'http://aboutreact.com/wp-content/uploads/2018/08/star_corner.png';
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
        //Keeping the Rating Selected in state
    }

    //Add Quantity
    setQuantityModalVisible(visible) {
        this.setState({ quantityModalVisible: visible });
    }

    /*--------User Rating Set----------*/
    setRatingModalVisible(visible) {
        this.setState({ ratingModalVisible: visible });
        console.log('Rating : ',this.state.Default_Rating);
        this.setRating();
    }

    setRating() {
        const { navigation } = this.props;
        const user_rating = this.state.Default_Rating;
        const product_id = this.state.pid;
        console.log('Rating : '+user_rating+'  Product Id:  '+product_id);
        const fetchConfig = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `product_id=${product_id}&rating=${user_rating}`
        };
        //console.log(fetchConfig);
        return fetch(
          `http://staging.php-dev.in:8844/trainingapp/api/products/setRating`,
          fetchConfig
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
                rating: responseJson.data,
            }, function () {

            });
            if(responseJson.status == 200)
            {
                console.log(responseJson.message);
            }
            //console.log(responseJson);
          })
          .catch(error => {
            console.error(error);
          });
      }

    //Retrieve product details
    componentDidMount() {
        const { navigation } = this.props;
        const pid = navigation.getParam("pid", "1");
        this.setState({ pid: pid});
        console.log("Product ID : ", pid);
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${pid}`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                    productImages: responseJson.data.product_images,
                    largeImage: responseJson.data.product_images[0].image
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderImages() {
        return this.state.productImages.map(item => {
            return (
                <TouchableOpacity onPress={() => this.setState({ largeImage: item.image })}>
                    <Image style={{ width: 70, height: 70, marginTop: 15, margin: 5, borderColor: 'gray', borderWidth: 1 }} source={{ uri: item.image }} />
                </TouchableOpacity>
            );
        });
    }

    renderLargeImage() {
        if (this.state.largeImage.length > 1) {
            return (
                <Image style={{ width: 257, height: 175, alignItems: 'center', padding: 50 }}
                    source={{ uri: this.state.largeImage }} />
            )
        }
    }


    render() {

        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        //Setting Product category
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

        //getting rating
        const ratingObj = {
            ratings: this.state.dataSource.rating,
            views: this.state.dataSource.view_count
        }

        return (

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#e8e4e3" }}>
                <View style={styles.box}>
                    <Text style={{ fontSize: 25, paddingLeft: 20, marginTop: 10, fontWeight: "bold", }}>{this.props.navigation.state.params.pname}</Text>
                    <Text style={{ fontSize: 20, paddingLeft: 20, }}>Category - {pcatval} </Text>
                    <View style={{ flex: 0, flexDirection: 'row', width: 420, }}>
                        <View style={{ flex: 0, flexDirection: 'column', }}>

                            <Text style={{ fontSize: 15, paddingLeft: 20, marginBottom: 10, marginRight: 250 }}>{this.state.dataSource.producer}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', }}>
                            <StarRating ratingObj={ratingObj} />
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
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.renderLargeImage()}
                        </View>
                        <View style={{ flex: 0, flexDirection: 'row', alignContent: 'center', paddingLeft: 20 }}>
                            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} nestedScrollEnabled>
                                {this.renderImages()}
                            </ScrollView>

                        </View>
                    </View>


                    <View style={{ flex: 0, }}>
                        <Text style={{ marginTop: 5, paddingLeft: 10, color: 'black', fontSize: 20, fontWeight: "bold", }}> DESCRIPTION</Text>
                        <Text style={{ marginTop: 2, paddingLeft: 10, color: 'black', fontSize: 15, }}> {this.state.dataSource.description}</Text>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.quantityModalVisible}>

                        <View style={{ flex: 1 }}>
                            <View style={{ opacity: 0.5, flex: 6, backgroundColor: '#000' }}>
                                <TouchableOpacity onPress={() => this.setQuantityModalVisible(!this.state.quantityModalVisible)} style={{ flex: 1 }} />
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 400 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 20 }}>{this.state.dataSource.name}</Text>
                                <View style={{ marginTop: 33 }}>
                                    {this.renderLargeImage()}
                                </View>

                                <TextInput style={{ fontSize: 20, padding: 20 }} placeholder="Enter Quantity" />

                                <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: 'red', borderRadius: 8,
                                            padding: 10,
                                            width: 176, height: 42,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => { this.setQuantityModalVisible(!this.state.quantityModalVisible);  }}>
                                        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', paddingBottom: 5 }}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.ratingModalVisible}>

                        <View style={{ flex: 1 }}>
                            <View style={{ opacity: 0.5, flex: 6, backgroundColor: '#000' }}>
                                <TouchableOpacity onPress={() => this.setRatingModalVisible(!this.state.ratingModalVisible)} style={{ flex: 1 }} />
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 420 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2C2B2B', paddingTop: 20 }}>{this.state.dataSource.name}</Text>
                                <View style={{ marginTop: 33 }}>
                                    {this.renderLargeImage()}
                                </View>
                                {/* Taking Rating from user */}
                                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                                <Text style={styles.textStyle}>
                                    {/*To show the rating selected*/}
                                    {this.state.Default_Rating} / {this.state.Max_Rating}
                                </Text>


                                <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: 'red', borderRadius: 8,
                                            padding: 10,
                                            width: 176, height: 42,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => { this.setRatingModalVisible(!this.state.ratingModalVisible);  }}>
                                        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>RATE NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>



                </View>
                <View style={styles.boxend}>
                    <View style={{ flexDirection: 'row', margin: 10, }}>
                        <TouchableOpacity style={styles.button} onPress={() => { this.setQuantityModalVisible(true) }}>
                            <Text style={styles.Textbutton}>BUY NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRate} onPress={() => { this.setRatingModalVisible(true); }}>
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
        height: 405,
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
    StarImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        marginTop: 5,
        marginBottom:10,
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