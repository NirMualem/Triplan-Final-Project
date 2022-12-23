import React, { useContext, useEffect, useState } from 'react';
import { View, Text , Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as TripContext } from '../../context/TripContext';

export function OpeningScreen({ navigation }) {
    const { state, signIn } = useContext(AuthContext);

    //check if user connected
    useEffect (() => {
        const checkUserLogin = async () =>{
                const loggedInUser = await AsyncStorage.getItem("token");//check for token
                if (loggedInUser !== 'null') {
                    const savedEmail = await AsyncStorage.getItem('email');
                    const savedPass = await AsyncStorage.getItem('password');
                    setTimeout(() => {

                      signIn({ email : savedEmail, password : savedPass, navigation });//log user in 
                    }, 1200); 
                }
            //case user not log in go to login screen
                else{
                    navigation.replace('Sign In');
                }  
            }
        checkUserLogin();
    }, []);

    return ( 
        <Image style={{backgroundColor:'lightblue' ,aspectRatio: 1, alignItems: 'center', flex: 1,justifyContent: 'center'}} source = {require('../../../assets/logo.png')} />
        );
}

export default OpeningScreen;