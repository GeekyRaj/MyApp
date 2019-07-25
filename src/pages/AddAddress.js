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
            <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#9b9e9c', }}>
                <View style={{marginVertical:20,flexGrow: 1,alignItems: 'center',alignContent:'stretch'}}>
                <Text>Address</Text>
                <TextInput style={styles.inputBox}
                    placeholder="Address"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                <Text>Landmark</Text>
                <TextInput style={styles.inputBox}
                    placeholder="Landmark"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                <Text>City</Text>
                <TextInput style={styles.inputBox}
                    placeholder="City"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                <Text>Zip Code</Text>
                <TextInput style={styles.inputBox}
                    placeholder="Zip Code"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                <Text>State</Text>
                <TextInput style={styles.inputBox}
                    placeholder="State"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                <Text>Country</Text>
                <TextInput style={styles.inputBox}
                    placeholder="Country"
                    placeholderTextColor='#e91c1a'>
                </TextInput>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        //flex: 1,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#e91c1a',
        marginVertical: 10,
        backgroundColor:'white',
    },
})