import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class MyAccount extends Component {
    static navigationOptions = {
        title: 'My Account',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerStyle: {
            backgroundColor: '#e91c1a',
        }
    };
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.imgView}>
                    <Image style={styles.img} source={require('../images/profile.jpg')} />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/username_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="First Name"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/username_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Last Name"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/email_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Email"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/cellphone.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Phone Number"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/dob_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="D.O.B"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Text style={styles.Textbutton}>Edit Profile</Text>
                </TouchableOpacity>


                <View style={{ marginTop: 20, flexGrow: 1, width: '100%', justifyContent: 'center', height: 40, backgroundColor: '#ffffff',  }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Resetpw')} >
                        <View style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: '#9c908f',
                                //textAlign: 'center',
                            }}>RESET PASSWORD</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //marginVertical:10,
        paddingTop: 20,
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#e91c1a"
    },
    inputBox: {
        width: 250,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 5,
    },
    img: {
        paddingTop: 15,
        height: 130,
        width: 130,
        borderRadius: 65,
        margin: 10,
    },
    imgIcon: {
        height: 15,
        width: 15,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 40,
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
    },
    Textbutton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#E91c1a',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    },
});