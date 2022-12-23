import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TripDetailsDays from '../Navigation/TripNavigation';
import { styles } from "../ComponentStyle";
import * as Animatable from 'react-native-animatable';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as BudgetContext } from '../../context/BudgetContext';
import { Context as TripContext } from '../../context/TripContext';

export default function AttractionDivision({ route, navigation }) {

    const { state } = useContext(AuthContext);
    const { fetchTripDays, updateTripUserIdGroup } = useContext(TripContext);
    const { GroupBudget, PersonalBudget } = useContext(BudgetContext);

    const [user, setUser] = useState(state.user);
    const [loading, setLoading] = useState(true);
    const userId = user._id;
    const tripId = route.params._id;

    useEffect(() => {
        const getData = async () => {
            updateState();
            await fetchTripDays({ tripId: route.params });
            setLoading(false);
        }
        getData();
    }, []);

    const updateState = () => {
        PersonalBudget({ tripId, userId });
        GroupBudget({ tripId });
    }

    return (
        <View style={{ flexGrow: 1, backgroundColor: '#009387' }}>
            {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={styles.loadingGif} /> :

                <View style={[styles.header, { flexDirection: 'row' }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back-circle' size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <Text style={styles.text_header}>Attractions</Text>
                </View>
            }
            <Animatable.View style={styles.footer} animation="fadeInUpBig" >
                <View style={{ marginTop: "5%", flexGrow: 1 }}>
                    <TripDetailsDays tripId={route.params} canUpdate={true} />
                </View>
                <View style={stylesAttraction.mainConatinerStyle}>
                    <TouchableOpacity style={[stylesAttraction.buttonStyle, {marginTop:2}]} onPress={() => { navigation.navigate("Budget", { tripId: tripId, userId: userId }); }}>
                        <Icon name='calculator' size={25} style={stylesAttraction.iconStyle} />
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>
    );
}
const stylesAttraction = StyleSheet.create({
    mainConatinerStyle: {
        flexDirection: 'column',
        flex: 1,

    }, floatingMenuButtonStyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    },
    textStyle: {
        color: '#009387',
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    buttonStyle: {
        color: '#009387',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(170, 207, 202)',
        overflow: "hidden",
        width: 35,
        height: 30,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        margin: 2,
        alignItems: 'center'

    },
    iconStyle: {
        color: '#009387'
    },

});