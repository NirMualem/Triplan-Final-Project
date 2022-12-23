import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Attraction from './Attraction';

export const AttractionsList = ({ attractions, specificAttractionId, setSpecificAttractionId, getAttractions }) => {
    const [loading, setLoading] = useState(false);

    const refreshList = async () => {
        setLoading(true);
        await getAttractions();
        setLoading(false);
    };

    const renderList = () => {
        return attractions.map(attraction => {
            return (
                <Attraction key={attraction.place_id} attraction={attraction} 
                specificAttractionId={specificAttractionId} setSpecificAttractionId={setSpecificAttractionId} />
            )
        });
    }

    return (
        <ScrollView style={{ flex: 1, maxHeight: 300 }}>
            
            {attractions && renderList()}
            <View style={{ bottom: 10, flexDirection: "row", width: '100%' }}>
                <TouchableOpacity onPress={refreshList}
                    style={{ shadowColor: "black", borderColor: "#abd1ce", margin: 6, borderRadius: 6, borderWidth: 4, paddingBottom: 3 }}>
                    <Text>Load more results</Text>
                </TouchableOpacity>
            </View>
            {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={{ height: 50, width: 50 }} /> : <Text/>}
        </ScrollView>
    );
}


export default AttractionsList;