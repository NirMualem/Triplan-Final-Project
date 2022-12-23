import React, { useState } from 'react';
import { View, Text, Modal, Image, Linking, TouchableOpacity, ScrollView } from 'react-native'
import TripMenu from "../Profile/TripMenu";
import TripDetailsDays from '../Navigation/TripNavigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from "../ComponentStyle";
import * as Animatable from 'react-native-animatable';
import DetailsSharedTrip from './DetailsSharedTrip';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const TripDetail = ({ trip, tripSize, menu}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const { headerContainer, headerText, imageStyle, headerDetailsText } = stylesDetails;
    return <View style={stylesDetails.viewStyle}>
        <View style={[stylesDetails.itemSectionStyle, { justifyContent: "space-between" }]}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon2 name='map-marker' style={[stylesDetails.iconStyle, { marginRight: 7, padding: 2 }]} size={19} />
                        <Text style={[stylesDetails.headerText, { fontWeight: 'bold', color: '#009387' }]}>{trip.country}</Text>
                    </View>
                    <Text style={[stylesDetails.headerDetailsText,{color: '#009387'}]}>{trip.name}</Text>
                </View>
                {menu && <TripMenu _id={trip._id} share={trip.share} />}
            </View>

        <View style={stylesDetails.itemSectionStyle}>
        <Image style={[imageStyle, { height: tripSize }]} source={{ uri: trip.urlImage === "hi" ? "https://s27363.pcdn.co/wp-content/uploads/2020/05/Arizona-Road-Trip-Itinerary.jpg.optimal.jpg" : trip.urlImage }} />
        </View>
        {!menu && <DetailsSharedTrip trip = {trip}/>}

    </View >
};

const stylesDetails =
{
    headerContainer: {
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    headerText: {
        fontSize: 18,
    },
    headerDetailsText: {
        fontSize: 14,
    },
    imageStyle: {
        height: 200,
        flex: 1,
        width: 0,
    },
    viewStyle: {
        backgroundColor: '#fff',
        shadowColor: "black",
        borderColor: "#abd1ce",
        marginTop: 10,
        borderRadius: 6,
        borderWidth: 4,
        marginRight: 10,
        marginLeft: 10,
        borderBottonWidth: 0,
    },
    itemSectionStyle: {
        borderBottonWidth: 1,
        borderColor: "gainsboro",
        padding: 5,
        flexDirection: 'row',
        justfyContent: 'flex-start',
        position: 'relative'
    },
    buttonClose: {
        color: '#009387',
        borderColor: '#009387',
        overflow: "hidden",
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    iconStyle: {
        color: '#009387'
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#009387',
        width: '90%',
    },
    buttonSubmit: {
        backgroundColor: '#009387',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(170, 207, 202)',
        overflow: "hidden",
        width: 100,
        justifyContent: 'center',
        textAlign: 'center'
    },
    textButton: {
        color: "white",
        fontWeight: 'bold',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    }
}

export default TripDetail