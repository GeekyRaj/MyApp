import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { withNavigation ,SafeAreaView,} from "react-navigation";
import API from '../components/API';
import style from '../Styles';

class MyAccount extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Account',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft:
                (<Icon
                    style={{ paddingLeft: 16, color: '#ffffff' }}
                    onPress={() => navigation.navigate('Dashboard')}
                    name="md-arrow-back"
                    size={30}
                />),
        };
    };

    constructor() {
        super();
        this.state = {
            dataSource: [],
            seconds: 0,
            TextInputEnable: false,
            isloading: true,
        }
        //this.getData();
        console.log('**** My Account ****');
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.getData();
          }); 
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    async getData() {
        const method = "GET";
        const url ="users/getUserData";
        return API(url, method, null)
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson.data.user_data,
                    isloading: false,
                });
                try {
                    AsyncStorage.setItem('@user_phoneno', this.state.dataSource.phone_no);
                    AsyncStorage.setItem('@user_dob', this.state.dataSource.dob);
                    AsyncStorage.setItem('@user_fname', this.state.dataSource.first_name);
                    AsyncStorage.setItem('@user_lname', this.state.dataSource.last_name);
                    console.log(this.state.dataSource.first_name+' '+this.state.dataSource.last_name);
                    console.log('Image : '+this.state.dataSource.profile_pic);
                } catch (error) {
                    // Error saving data
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        if(this.state.isloading){
            return (
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center',}}>
                <Image source={require("../images/Loader1.gif")} />
                </View>
              )
        }
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>

                <View style={styles.imgView}>
                    <Image style={styles.img} source={require('../images/profile.jpg')} />
                </View>
                <View style={style.SectionStyle}>
                    <Icon style={style.Expoicon} name="md-person" size={25}/>
                    <TextInput
                        style={style.inputBox}
                        placeholder="First Name"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.first_name}
                    />
                </View>
                <View style={style.SectionStyle}>
                    <Icon style={style.Expoicon} name="md-person" size={25}/>
                    <TextInput
                        style={style.inputBox}
                        placeholder="Last Name"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.last_name}
                    />
                </View>
                <View style={style.SectionStyle}>
                    <Icon style={style.Expoicon} name="md-mail" size={25}/>
                    <TextInput
                        style={style.inputBox}
                        placeholder="Email"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.email}
                        keyboardType="email-address"
                    />
                </View>
                <View style={style.SectionStyle}>
                    <Icon style={style.Expoicon} name="md-call" size={25}/>
                    <TextInput
                        style={style.inputBox}
                        placeholder="Phone Number"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.phone_no}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={style.SectionStyle}>
                    <Icon style={style.Expoicon} name="md-time" size={25}/>
                    <TextInput
                        style={style.inputBox}
                        placeholder="D.O.B"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.dob}
                        keyboardType="number-pad"
                    />

                </View>
                <TouchableOpacity style={style.WhiteButton} onPress={() => this.props.navigation.navigate('EditProfile')} >
                    <Text style={style.WhiteTextbutton}>Edit Profile</Text>
                </TouchableOpacity>


                <View style={{ marginTop: 20, width: '100%', justifyContent: 'center',  backgroundColor: '#ffffff', height:60,bottom:0,position:"absolute" }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Resetpw')} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
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
            </SafeAreaView>
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
});

export default withNavigation(MyAccount);