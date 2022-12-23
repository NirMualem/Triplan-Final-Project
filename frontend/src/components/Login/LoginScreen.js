import React, { useContext, useState , useEffect } from 'react';
import { View, Text, TouchableOpacity ,TextInput, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useValidation } from 'react-native-form-validator';
import { Context as AuthContext } from '../../context/AuthContext';
import { styles } from "../ComponentStyle";


export const LoginScreen = ({ navigation }) => {
    const { state, signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const { validate, isFieldInError } = useValidation({ state: { email, password } }); //isFieldError = if there's an error in the current field
    let errorMap = new Map(); // map that save errors in current filed
    errorMap.set("emailErr", ""); //email field
    errorMap.set("passwordErr", "");//password field

    // when submit log in . check validate of form and call signIn function 
    const onSubmitPress = async () => { 
        setLoading(true);
        if (validate({
            email: { email: true, required: true }, //Check if a state variable is an email and state variable is not empty.
            password: { required: true }, //Check if a state variable is not empty.
        }))
        await signIn({ email, password, navigation });
        setLoading(false);
    };

    //move to sign up page
    const onChangePagePress = () => {
        state.errorMessage = '';
        navigation.replace("Sign Up");
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome to Triplan!</Text>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />
                    <TextInput placeholder='Your Email'
                        style={styles.textInput} autoCapitalize='none' onChangeText={setEmail} />
                </View>
                {isFieldInError('email') &&
                errorMap.set('emailErr', 'Please enter a vaild email address') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('emailErr')}</Text>
                }
                
                <Text style={[styles.text_footer, { marginTop: 30 }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#05375a" size={20} />
                    <TextInput placeholder='Your Password'
                        secureTextEntry={passwordVisible} style={styles.textInput} onChangeText={setPassword} />
                    <TouchableOpacity onPress={() => {setPasswordVisible(!passwordVisible)}}>
                        <Text>{passwordVisible ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                </View>
                {isFieldInError('password') &&
                errorMap.set('passwordErr', 'Please enter a vaild password') &&
                <Text style={styles.errMsgStyle}>{errorMap.get('passwordErr')}</Text>
                }
                
                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>

                {state.errorMessage ? <Text style={styles.errMsgStyle}>{state.errorMessage}</Text> : null}

                <View style={styles.button}>
                    <TouchableOpacity disabled={loading} style={styles.signIn} onPress={onSubmitPress} >
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {loading ?  <Image source={require('./../../../assets/simpleLoading.gif')}  style={{height:50 , width:50}}/> : <Text/>}
                    <TouchableOpacity disabled={loading}>
                        <Text style={{ color: '#009387', marginTop: 15 }}
                            onPress={onChangePagePress}>Not registered yet? Sign up!</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default LoginScreen;