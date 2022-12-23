import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Attraction = ({ attraction, specificAttractionId, setSpecificAttractionId }) => {
    const { text, title, row, line } = stylesAttraction;

    return (
        <TouchableOpacity onPress={() => setSpecificAttractionId(attraction.place_id)} 
        style={specificAttractionId === attraction.place_id 
        ? [stylesAttraction.viewStyle , {backgroundColor:"aquamarine"}] : stylesAttraction.viewStyle} >
            <Text style={title}>{attraction.name}</Text>
            <View style={line} />
            <View style={row}>
                <Text style={text} >Address:</Text>
                <Text>{attraction.formatted_address}</Text>
            </View>
            <View style={row}>
                <Text style={text}>Rating:</Text>
                <Text>{attraction.rating} (from {attraction.user_ratings_total} users)</Text>
            </View>
        </TouchableOpacity >
    )
};

export default Attraction;

const stylesAttraction = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009387',
        marginHorizontal: 6
    },
    text: {
        fontWeight: 'bold',
        color: '#29c2b9',
        marginHorizontal: 6,
    },
    row: {
        flexDirection: 'row',
    },
    line: {
        borderBottomColor: '#abd1ce',
        borderBottomWidth: 1,
        width: '95%',
        alignItems: 'center',
        marginLeft: 6
    },
    itemSectionStyle: {
        borderBottonWidth: 1,
        borderColor: "gainsboro",
        padding: 5,
        flexDirection: 'row',
        justfyContent: 'flex-start',
        position: 'relative'
    },
    viewStyle: {
        shadowColor: "black",
        borderColor: "#abd1ce",
        margin: 6,
        borderRadius: 6,
        borderWidth: 4,
        paddingBottom:3
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#009387'
    },
});