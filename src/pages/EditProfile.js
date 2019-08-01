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
import DatePicker from 'react-native-datepicker';
import Icon from '@expo/vector-icons/Ionicons';

export default class EditProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
        title: 'Edit Profile',
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

    constructor() {
        super();
        this.state = {
            dataSource: [],
            TextInputEnable: false,
            token: '',
            fname: '',
            lname: '',
            email: '',
            pno: '',
            date: "15-05-2000",
            errmsg: ' ',
            error: 0,
            //ShowErrorBorder var Validate
            fnameVal: true,
            lnameVal: true,
            emailVal: true,
            pnoVal: true,
        }
        this.GetUserData();
    }

    GetUserData = async () => {
        try {
            this.setState({
                token: await AsyncStorage.getItem('@user_at'),
                fname: await AsyncStorage.getItem('@user_fname'),
                lname: await AsyncStorage.getItem('@user_lname'),
                email: await AsyncStorage.getItem('@user_email'),
                pno: await AsyncStorage.getItem('@user_phoneno'),
                date: await AsyncStorage.getItem('@user_dob'),
            })
            console.log('In MyAccount')
        } catch (e) {
            console.log(e);
        }
        console.log('Value Retrieved for user :'+this.state.fname+' '+this.state.token);
    }

    updateValue(text, field) {
        alph = /^[a-zA-Z]+$/;
        mailreg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        phonereg = /^\d{3}\d{3}\d{4}$/;

        if (field == 'fname') {
            if (alph.test(text)) {
                this.setState({
                    fname: text,
                    fnameVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid First name');
                this.setState({ errmsg: 'Enter Only alphabets for First Name !', error: 1, fnameVal: false, })
            }

        }
        else if (field == 'lname') {
            if (alph.test(text)) {
                this.setState({
                    lname: text,
                    lnameVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid last name');
                this.setState({ errmsg: 'Enter Only alphabets for last Name !', error: 1, lnameVal: false, })
            }
        }
        else if (field == 'email') {
            if (mailreg.test(text)) {
                this.setState({
                    email: text,
                    emailVal: true,
                    error: 0,
                })
            }
            else {
                console.log('inavlid Email ID');
                this.setState({ errmsg: 'Enter valid email address !', error: 1, emailVal: false, })
            }
        }
        else if (field == 'pno') {
            if (phonereg.test(text)) {
                this.setState({
                    pno: text,
                    pnoVal: true,
                    error: 0,
                })
            }
            else {
                console.log('Inavlid Phone Number');
                this.setState({ errmsg: 'Enter 10 digit Contact Number!', error: 1, pnoVal: false, })
            }
        }
    }

    onPressButton = () => {
        if (this.state.TextInputEnable == false) {
            this.setState({ TextInputEnable: true })
        }
        if (this.state.TextInputEnable == true) {
            if(this.state.error == 0)
            {
                this.setState({ TextInputEnable: false })
                //& update the data in api
                this.updateUser();
            }
            else
            {
                alert(this.state.errmsg);
            }
        }
    }

    async updateUser() {
        const token = this.state.token;
        const first_name = this.state.fname;
        const last_name = this.state.lname;
        const email = this.state.email;
        const phone_no = this.state.pno;
        const dob = this.state.date;
    
        const fetchConfig = {
          method: "POST",
          headers: {
            access_token: token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `first_name=${first_name}&last_name=${last_name}&email=${email}&dob=${dob}&profile_pic={"test.png"}&phone_no=${phone_no}`
        };
        return fetch(
          `http://staging.php-dev.in:8844/trainingapp/api/users/update`,
          fetchConfig
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ dataSource: responseJson }, function() {})
            this.isSuccessfull();
          })
          .catch(error => {
            console.error(error);
          });
      }

      isSuccessfull() {
        const { navigate } = this.props.navigation;
        if (this.state.dataSource.status == 200) {
          
          setTimeout(function() {
            navigate("MyAccount");
          }, 2000);
          alert("" + this.state.dataSource.user_msg);
        } else if (this.state.dataSource.status == 401) {
          alert("" + this.state.dataSource.user_msg);
        } else if (this.state.dataSource.status == 400) {
          alert("" + this.state.dataSource.user_msg);
        } else {
          alert("Something Went Wrong");
        }
      }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.imgView}>
                    <Image style={styles.img} source={require('../images/profile.jpg')} />
                </View>
                <View style={[styles.SectionStyle, !this.state.fnameVal ? styles.error : null]}>
                    <Image style={styles.imgIcon} source={require('../images/username_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="First Name"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.fname}
                        onChangeText={(text) => this.updateValue(text, 'fname')}
                    />
                </View>
                <View style={[styles.SectionStyle, !this.state.lnameVal ? styles.error : null]}>
                    <Image style={styles.imgIcon} source={require('../images/username_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Last Name"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.lname}
                        onChangeText={(text) => this.updateValue(text, 'lname')}
                    />
                </View>
                <View style={[styles.SectionStyle, !this.state.emailVal ? styles.error : null]}>
                    <Image style={styles.imgIcon} source={require('../images/email_icon.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Email"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.email}
                        onChangeText={(text) => this.updateValue(text, 'email')}
                        keyboardType="email-address"
                    />
                </View>
                <View style={[styles.SectionStyle, !this.state.pnoVal ? styles.error : null]}>
                    <Image style={styles.imgIcon} source={require('../images/cellphone.png')} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Phone Number"
                        placeholderTextColor='#ffffff'
                        editable={this.state.TextInputEnable}
                        defaultValue={this.state.pno}
                        onChangeText={(text) => this.updateValue(text, 'pno')}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.SectionStyle}>
                    
                    <DatePicker
                        style={{ width: 270,borderColor:null,borderRadius:15 }}
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="D.O.B"
                        format="DD-MM-YYYY"
                        minDate="01-01-1980"
                        maxDate="01-01-2019"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onPressButton} >
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