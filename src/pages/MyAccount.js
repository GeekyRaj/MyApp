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

    constructor() {
        super();
        this.state = {
            dataSource: [],
            seconds: 0,
            TextInputEnable: false,
        }
        //this.getData();
        console.log('**** My Account ****');
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    async componentDidMount() {
        console.log('---- Component Did Mount ----')
        this.getData();
        //this.interval = setInterval(() => this.tick(), 10);
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
    }

    async getData() {
        const token = await AsyncStorage.getItem("@user_at");
        const fetchConfig = {
            method: "GET",
            headers: {
                access_token: token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        return fetch(
            `http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`,
            fetchConfig
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson.data.user_data
                });
                //console.log(responseJson);
                try {
                    AsyncStorage.setItem('@user_phoneno', this.state.dataSource.phone_no);
                    AsyncStorage.setItem('@user_dob', this.state.dataSource.dob);
                } catch (error) {
                    // Error saving data
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

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
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.first_name}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/username_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Last Name"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.last_name}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/email_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Email"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.email}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/cellphone.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Phone Number"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.phone_no}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={require('../images/cake.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="D.O.B"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.dataSource.dob}
                        keyboardType="number-pad"
                    />

                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EditProfile')} >
                    <Text style={styles.Textbutton}>Edit Profile</Text>
                </TouchableOpacity>


                <View style={{ marginTop: 20, flexGrow: 1, width: '100%', justifyContent: 'center', height: 40, backgroundColor: '#ffffff', }}>
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
    error: {
        borderWidth: 2,
        borderColor: 'orange',
    }
});