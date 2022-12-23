import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../ComponentStyle';
import TripList from '../Home/TripList';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as TripContext } from '../../context/TripContext';

export default function HomeScreen({ navigation }) {
    
    const {state , fetchSharedTrips ,fetchMyTrips } = useContext(TripContext);
    const userState = useContext(AuthContext);

    useEffect( async() => {
        await fetchMyTrips({_id : userState.state.user._id});
        await fetchSharedTrips({_id : userState.state.user._id});
    }, [])

    const tripImageSize = 200;
    return (
        <ScrollView style={{ flexGrow: 1 }}>
            <View style={{ marginTop: "5%",marginBottom:"15%", flexGrow: 1 }}>
                <TripList Trip={state.shareTrips} tripSize={tripImageSize} menu={false}/>
            </View>
        </ScrollView>
    );
}
