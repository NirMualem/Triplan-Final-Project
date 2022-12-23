import React, { Component, useEffect, useState } from 'react';
import { View, ScrollView,Text, TimePickerAndroid } from 'react-native';
import TripDetail from './TripDetail';

export const TripList = ({ Trip ,tripSize , menu}) => {

    const renderList = () => {
        return Trip.map(trip => {
            return <TripDetail
                key={trip._id} trip={trip} menu={menu} tripSize={tripSize}/>; 
        });
    }
    
    return (
        <ScrollView style={{ flex: 1, flexGrow: 1 }}>
         {Trip && renderList()} 
        </ScrollView>
    );
}


export default TripList;