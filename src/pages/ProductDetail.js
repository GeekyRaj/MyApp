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
            isLoading: true,
            dataSource: [],
            productImages: [],
            largeImage: "",
            quantityModalVisible: false,
            ratingModalVisible: false
        }

    }

    setQuantityModalVisible(visible) {
        this.setState({ quantityModalVisible: visible });
    }

    setRatingModalVisible(visible) {
        this.setState({ ratingModalVisible: visible });
    }

    componentDidMount() {
        const { navigation } = this.props;
        const pid = navigation.getParam("pid", "1");
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
                {/*<Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={this.toggleModal} />
                    </View>
        </Modal>*/}

                {/*Actual Design Layout of Product detail*/}
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
                </View>
                <View style={styles.boxend}>
                    <View style={{ flexDirection: 'row', margin: 10, }}>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.setQuantityModalVisible(true)}}>
                            <Text style={styles.Textbutton}>BUY NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRate} onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Text style={styles.TextbuttonRate}>RATE</Text>
                        </TouchableOpacity>
                    </View>
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

                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2C2B2B', paddingTop: 20 }}>{this.props.navigation.state.params.pname}</Text>
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
                                    onPress={() => { this.setQuantityModalVisible(!this.state.quantityModalVisible); }}>
                                    <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', paddingBottom: 5 }}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


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