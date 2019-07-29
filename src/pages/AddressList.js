import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import RadioButton from '../components/RadioButton'



const options = [
    {
        key: '1',
        text:'NeoSOFT Technologies $th Floor, The Ruby, 29, Senapati Bapat marg, dadar (West) Mumbai- 400-026.India.',
        head: 'Glen Dmello',
    },
    {
        key: '2',
        text:'NeoSOFT Technologies $th Floor, The Ruby, 29, Senapati Bapat marg, dadar (West) Mumbai- 400-026.India.',
        head: 'Glen Dmello',
    },
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
            <View style={{ flex: 1, width: 400, alignItems: 'center', justifyContent: 'center', absolute: 0, }}>
                
                <RadioButton options={options}  />
                
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddressList')}>
                    <Text style={styles.Textbutton}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
        marginTop: 15,
    },
})