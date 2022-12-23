import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Context as AuthContext } from '../../context/AuthContext';
import { useValidation } from 'react-native-form-validator';
import { styles } from "../ComponentStyle";

export const SignUpScreen = ({ navigation }) => {
    const { state, signUp } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const { validate, isFieldInError } = useValidation({ state: { firstName, lastName ,email, password, confirmPassword } }); //isFieldError = if there's an error in the current field
    
    let errorMap = new Map(); // map that save errors in current filed
    errorMap.set("emailErr", ""); //email field
    errorMap.set("nameErr", ""); //name field
    errorMap.set("passwordErr", "");//password field
    errorMap.set("confirmPasswordErr", "");//confirm password field

    // when submit sign up . check validate of form and call signUp function 
    const onSubmitPress = () => { 
        setLoading(true);
        if (validate({
            email: { email: true, required: true }, //Check if a state variable is an email and state variable is not empty.
            firstName: { required: true , minlength:2, maxlength:20}, //Check if a state variable  is not empty and between 2 to 20 char.
            lastName: { required: true , minlength:2, maxlength:20}, //Check if a state variable  is not empty and between 2 to 20 char.
            password: { required: true , minlength:6, maxlength:20}, //Check if a state variable is not empty and between 6 to 20 char.
            confirmPassword: { equalPassword: password, required: true }//Check if a state variable is equal to password value
        }))
        signUp({ email, password, confirmPassword, firstName, lastName, navigation });
        setLoading(false);
    };

    //move to sign in page
    const onChangePagePress = () => {
        state.errorMessage = '';
        navigation.replace("Sign In");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register now!</Text>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                
                <Text style={styles.text_footer}>first name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={styles.awesomeStyle} />
                    <TextInput placeholder='enter your name'
                        style={styles.textInput} autoCapitalize='none' value={firstName}
                        onChangeText={setFirstName} />
                </View>

                <Text style={styles.text_footer}>last name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={styles.awesomeStyle} />
                    <TextInput placeholder='enter your familiy name'
                        style={styles.textInput} autoCapitalize='none' value={lastName}
                        onChangeText={setLastName} />
                </View>

                {(isFieldInError('firstName') || isFieldInError('lastName') )&&
                errorMap.set('nameErr', 'First name and last name require. please enter between 2 letter to 20 .') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('nameErr')}</Text>
                }

                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={styles.awesomeStyle} />
                    <TextInput placeholder='Your Email'
                        style={styles.textInput} autoCapitalize='none' value={email}
                        onChangeText={setEmail} />
                </View>
                {isFieldInError('email') &&
                errorMap.set('emailErr', 'Please enter a vaild email address') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('emailErr')}</Text>
                }
                
                <Text style={styles.text_footer}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#05375a" size={20} style={styles.awesomeStyle} />
                    <TextInput placeholder='Your Password'
                        secureTextEntry={passwordVisible} style={styles.textInput} value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => {setPasswordVisible(!passwordVisible)}}>
                        <Text>{passwordVisible ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                        
                </View>

                {isFieldInError('password') &&
                errorMap.set('passwordErr', 'Please enter a vaild password. must be \n between 6 to 20 char.') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('passwordErr')}</Text>
                }

                <Text style={styles.text_footer}>Confirm Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#05375a" size={20} style={styles.awesomeStyle} />
                    <TextInput placeholder="Confirm Your Password"
                        secureTextEntry={confirmPasswordVisible} style={styles.textInput}
                        onChangeText={setConfirmPassword} />
                    <TouchableOpacity onPress={() => {setConfirmPasswordVisible(!confirmPasswordVisible)}}>
                        <Text>{confirmPasswordVisible ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                </View>

                {(!isFieldInError('password') && isFieldInError('confirmPassword')) &&
                errorMap.set('confirmPasswordErr', 'Passwords do not match') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('confirmPasswordErr')}</Text>
                }
                
                {state.errorMessage ? <Text style={styles.errMsgStyle}>{state.errorMessage}</Text> : null}

                <View style={styles.button}>
                    <TouchableOpacity disabled={loading} style={styles.signIn} onPress={onSubmitPress} >
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn} >
                            <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {loading ?  <Image source={require('./../../../assets/simpleLoading.gif')}  style={{height:50 , width:50}}/> : <Text/>}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity disabled={loading}>
                        <Text style={{ color: '#009387', marginTop: 15 }}
                            onPress={onChangePagePress}>Already have an account? Sign in!</Text>
                    </TouchableOpacity>
                </View>
                
            </Animatable.View>
        </View>
    );
}

export default SignUpScreen;

