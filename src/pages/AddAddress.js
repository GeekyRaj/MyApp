import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
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


    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ebe8e8', }}>
                <View style={{ margin: 15, flexGrow: 1, alignContent: 'stretch' }}>
                    <Text style={styles.labl}>ADDRESS</Text>
                    <TextInput style={styles.inputBoxAdd}
                        multiline={true}
                        onChangeText={text=>this.setState({value:text})}
                        underlineColorAndroid='transparent'
                        placeholder="Address"
                        placeholderTextColor='black'>
                    </TextInput>
                    <Text style={styles.labl}>LANDMARK</Text>
                    <TextInput style={styles.inputBox}
                        placeholder="Landmark"
                        placeholderTextColor='black'>
                    </TextInput>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexGrow: 1, height: 210, width: 170, }}>
                            <Text style={styles.labl}>CITY</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="City"
                                placeholderTextColor='black'>
                            </TextInput>
                            <Text style={styles.labl}>ZIP CODE</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Zip Code"
                                placeholderTextColor='black'>
                            </TextInput>
                        </View>

                        <View style={{ flexGrow: 1, height: 210, width: 170, marginLeft: 20, }}>
                            <Text style={styles.labl}>STATE</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="State"
                                placeholderTextColor='black'>
                            </TextInput>
                            <Text style={styles.labl}>COUNTRY</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Country"
                                placeholderTextColor='black'>
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddressList')}>
                        <Text style={styles.Textbutton}>SAVE ADDRESS</Text>
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
        marginTop:10,
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
        marginLeft:40,
    },
})