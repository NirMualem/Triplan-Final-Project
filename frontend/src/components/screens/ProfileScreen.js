import React , {useContext, useState} from 'react';
import { View, Text, Image ,StyleSheet } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as TripContext } from '../../context/TripContext';
import * as Animatable from 'react-native-animatable';
import { styles } from "../ComponentStyle";
import ProfileImage from "../Profile/ProfileImage";
import ProfileMenu from "../Profile/ProfileMenu";
import UserInfo from '../Profile/UserInfo';
import TripList from '../Home/TripList';
 
export default function ProfileScreen({navigation}) {
    const { state } = useContext(TripContext);
    const tripImageSize = 100;
    return (
        <View style={styles.container}>
            
            <View style={styles.header} />
                <ProfileMenu />
            <View/>
            <Animatable.View style={[styles.footer]} animation="fadeInUpBig" >
                <View style={{flexDirection: 'row'}}> 
                <ProfileImage/> 
                <UserInfo />
                </View>
                <TripList Trip={state.myTrips} tripSize={tripImageSize} menu={true}/>
            </Animatable.View>
            
        </View>
    );
}