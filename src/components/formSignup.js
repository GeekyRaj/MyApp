import React, {Component} from 'react';
//import RadioForm, { RadioButton, RadioButtonInput,RadioButtonLabe} from 'react-native-simple-radio-button';
import { StyleSheet, 
    Text,
    View,
    TextInput, 
    TouchableOpacity,
    RadioButtons,
    CheckBox,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

var options=[
    {label: "Male", value:0},
    {label: "Female", value:1},
];

var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ];

export default class Logo extends Component {
    
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-person"
                    size={25}
                />
                <TextInput 
                    style={styles.inputBox}
                    placeholder = "First Name"
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-person"
                    size={25}
                />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Last Name"
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-mail"
                    size={25}
                />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Email"
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-lock"
                    size={25}
                />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-lock"
                    size={25}
                />
                 <TextInput
                    style={styles.inputBox}
                    placeholder = "Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 
                 <Text style={{fontSize: 16,
                                color: '#ffffff',
                                textAlign: 'left'}}>Gender
                </Text>
                
                {/*<RadioGroup>
                    <RadioButton value={'M'} >
                        <Text>Male</Text>
                    </RadioButton>
 
                    <RadioButton value={'F'}>
                        <Text>Female</Text>
                    </RadioButton>
                </RadioGroup>*/}
                {/*<RadioForm
                    radio_props={options}
                    initial={-1}
                    onPress={(value) => {}}
                />*/}

                 <View style={styles.SectionStyle}>
                <Icon
                    style={{ paddingLeft: 16 , color: '#ffffff'}}
                    name="md-phone-portrait"
                    size={25}
                />
                 <TextInput 
                    style={styles.inputBox}
                    placeholder = "Phone Number"
                    secureTextEntry={true}
                    placeholderTextColor ='#ffffff'
                 />
                 </View>
                 <View style={{
                            paddingVertical: 12,
                            flexDirection:'row'}}>
                    <CheckBox checked={true} />
                    <Text style={{fontSize: 16,
                            color: '#ffffff',
                            textAlign: 'left'}}>I agree the Terms and conditions.
                    </Text>
                </View>
                 <TouchableOpacity style={styles.button}>
                     <Text style={styles.Textbutton}>REGISTER</Text>
                 </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        flexGrow: 1,
        alignItems: 'center',
    },
    inputBox: {
        width: 250,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical:5,
        fontSize: 16,
        color: '#ffffff' ,
        marginVertical :5, 
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
        marginVertical :10,
        paddingVertical: 10,
    }
  });