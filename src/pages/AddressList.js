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

var radio_props = [
    { label: <Text style={{ fontSize: 15, padding: 5, }}>Glen Dmello Neosoft Technologies 4th floor, The Ruby, 29 Senapati Bapat Marg, Dadar(west) Mumbai-400-028.INDIA</Text>, value: 0 },
    { label: 'param2', value: 1 }
];


export default class AddressList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            //title: navigation.getParam('pname', 'Product Detail'),
            title: "Address List",
            headerTintColor: '#fff',
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.pop()}
                    name="md-arrow-back"
                    size={30}
                />),
            headerRight:
                (<Icon
                    style={{ paddingRight: 16, color: '#ffffff' }}
                    onPress={() => navigation.navigate('AddAddress')}
                    name="md-add"
                    size={30}
                />),
        };
    };


    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',absolute:0, }}>
                <Text>AddressList</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { this.setState({ value: value }) }}
                />
            </View>
        )
    }
}