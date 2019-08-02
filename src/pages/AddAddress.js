import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';



export default class AddAddress extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            //title: navigation.getParam('pname', 'Product Detail'),
            title: "Add Address",
            headerTintColor: '#fff',
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
            headerRight: null,
        };
    };

    constructor() {
        super();
        this.state = {
            dataSource: [],
            address: ' ',
            landmark: ' ',
            city: ' ',
            statec: ' ',
            zip:'',
            country: ' ',
        }
    }

    async placeOrder() {
        const Address = '' + this.state.address + ', ' + this.state.landmark + ', ' + this.state.city + ': ' + this.state.zip + ', ' + this.state.statec + ', ' + this.state.country;
        console.log(Address);
        const token = await AsyncStorage.getItem("@user_at");
        const fetchConfig = {
            method: "POST",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `address=${Address}`
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/order`,
            fetchConfig
        )
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ dataSource : responseJson }, function() {}),
              this.Prompt();
          })
          .catch(error => {
            console.error(error);
          });
      }

    Prompt() {
        const { navigate } = this.props.navigation;
        if (this.state.dataSource.status == 200) {
          setTimeout(function() {
            navigate("Home");
          }, 2000);
          alert("" + this.state.dataSource.user_msg);
        } else if (this.state.dataSource.status == 401) {
          alert("" + this.state.dataSource.user_msg);
        } 
      }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ebe8e8', }}>
                <View style={{ margin: 15, flexGrow: 1, alignContent: 'stretch' }}>
                    <Text style={styles.labl}>ADDRESS</Text>
                    <TextInput style={styles.inputBoxAdd}
                        multiline={true}
                        onChangeText={text => this.setState({ value: text })}
                        underlineColorAndroid='transparent'
                        placeholder="Address"
                        placeholderTextColor='black'
                        onChangeText={address => this.setState({ address })}>
                    </TextInput>
                    <Text style={styles.labl}>LANDMARK</Text>
                    <TextInput style={styles.inputBox}
                        placeholder="Landmark"
                        placeholderTextColor='black'
                        onChangeText={landmark => this.setState({ landmark })}>
                    </TextInput>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexGrow: 1, height: 210, width: 170, }}>
                            <Text style={styles.labl}>CITY</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="City"
                                placeholderTextColor='black'
                                onChangeText={city => this.setState({ city })}>
                            </TextInput>
                            <Text style={styles.labl}>ZIP CODE</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Zip Code"
                                placeholderTextColor='black'
                                onChangeText={zip => this.setState({ zip })}>
                            </TextInput>
                        </View>

                        <View style={{ flexGrow: 1, height: 210, width: 170, marginLeft: 20, }}>
                            <Text style={styles.labl}>STATE</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="State"
                                placeholderTextColor='black'
                                onChangeText={statec => this.setState({ statec })}>
                            </TextInput>
                            <Text style={styles.labl}>COUNTRY</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Country"
                                placeholderTextColor='black'
                                onChangeText={country => this.setState({ country })}>
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.placeOrder()}>
                        <Text style={styles.Textbutton}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1
    },
    inputBoxAdd: {
        textAlignVertical: "top",
        padding: 10,
        fontSize: 16,
        color: 'black',
        //marginVertical: 10,
        backgroundColor: 'white',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1
    },
    labl: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    Textbutton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: '#E91c1a',
        borderRadius: 15,
        marginVertical: 10,
        paddingVertical: 10,
        marginLeft: 40,
    },
})