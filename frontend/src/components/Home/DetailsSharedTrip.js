import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Modal, Image, Linking, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import TripMenu from "../Profile/TripMenu";
import TripDetailsDays from '../Navigation/TripNavigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { styles } from "../ComponentStyle";
import * as Animatable from 'react-native-animatable';
import { Context as TripContext } from '../../context/TripContext';
import { Context as AuthContext } from '../../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-neat-date-picker';
import { useNavigation } from '@react-navigation/native';

const DetailsSharedTrip = ({ trip }) => {

    const navigation = useNavigation();

    const { state } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalNewTripVisible, setModalNewTripVisible] = useState(false);
    const { fetchTripDays, takeSharedTrip } = useContext(TripContext);
    const [loading, setLoading] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const [name, setName] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const [user, setUser] = useState(state.user);
    const userId = user._id;

    const takeTheTrip = async () => {
        setLoading(true);
        await fetchTripDays({ tripId: trip });
        setLoading(false);
        setModalVisible(!modalVisible);
    }
    const openDatePicker = () => {
        setShowDatePicker(true)
    }
    const colorOptions = {
        headerColor: '#009387',
        weekDaysColor: '#009387',
        selectedDateBackgroundColor: '#009387'
    }

    const onChange = () => {
        // You should close the modal in here
        setShowDatePicker(false)
    }

    const onConfirm = (date) => {

        setStartDate(date.startDateString)
        // setStartDate(swapDateOrder(date.startDateString))
        setEndDate(date.endDateString)
        // setEndDate(swapDateOrder(date.endDateString))
        // You should close the modal in here
        setShowDatePicker(false)
    }
    const onTakeTheTrip = () => {
        setModalVisible(!modalVisible);
        setModalNewTripVisible(!modalNewTripVisible);
    }


    const onSubmit = async () => {
        setLoadingCreate(true);
        await takeSharedTrip({ trip, userId, name, startDate, endDate, navigation });
        setLoadingCreate(false);
        setModalNewTripVisible(!modalNewTripVisible);
    }

    const { headerContainer, headerText, imageStyle, headerDetailsText } = stylesDetails;
    return <View>

        <View style={[stylesDetails.itemSectionStyle, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity style={stylesDetails.styleTakeButton} onPress={() => takeTheTrip()}>
                <Icon2 name='information-circle-outline' style={[stylesDetails.iconStyle, { marginRight: 2 }]} size={19} />
                <Text style={{ color: '#009387', paddingTop: 1 }}>See details</Text>
            </TouchableOpacity>

        </View>
        {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={styles.loadingGif} /> :

            <Modal
                transparent={true}
                animationType={"slide"}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }}>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 100, alignItems: 'center'}}>
                        <View style={stylesDetails.modal}>
                            <View style={styles.container}>

                                <View style={styles.header}>
                                    <Text style={styles.text_header}>{trip.name}</Text>
                                </View>
                                <Animatable.View style={styles.footer} animation="fadeInUpBig" >
                                    <TouchableOpacity style={stylesDetails.buttonClose} onPress={() => { setModalVisible(!modalVisible) }}>
                                        <Icon name='close' style={stylesDetails.iconStyle} size={25} />
                                    </TouchableOpacity>
                                    <View>
                                        <TripDetailsDays tripId={trip} canUpdate={false}/>
                                    

                                    <View style={[stylesDetails.itemSectionStyle, { justifyContent: 'center' }]}>
                                        <TouchableOpacity style={stylesDetails.styleTakeButton} onPress={() => { onTakeTheTrip() }}>
                                            <Icon name='save' style={[stylesDetails.iconStyle, { marginRight: 2 }]} size={19} />
                                            <Text style={{ color: '#009387', paddingTop: 1 }}>Take this trip</Text>
                                        </TouchableOpacity>

                                    </View>
                                    </View>
                                </Animatable.View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        }
        <Modal
            transparent={true}
            animationType={"slide"}
            visible={modalNewTripVisible}
            onRequestClose={() => { setModalNewTripVisible(!modalNewTripVisible) }}>
            <View style={{ flex: 1, marginTop: 100, alignItems: 'center' }}>
                <View style={stylesDetails.modal}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Text style={styles.text_header}>update the trip</Text>
                        </View>

                        <Animatable.View style={[styles.footer, { marginTop: '5%' }]} animation="fadeInUpBig" >
                        {loadingCreate ? <Image source={require('./../../../assets/waiting-page.gif')} style={styles.loadingGif} /> :

                            <View>
                                <TouchableOpacity style={stylesDetails.buttonClose} onPress={() => { setModalNewTripVisible(!modalNewTripVisible) }}>
                                    <Icon name='close' style={stylesDetails.iconStyle} size={25} />
                                </TouchableOpacity>
                                <View>

                                    <Text style={styles.text_footer}>Name Your Trip</Text>

                                    <View style={styles.action}>
                                        <FontAwesome name="globe" color="#05375a" size={20} />
                                        <TextInput placeholder='Your trip name'
                                            style={styles.textInput} autoCapitalize='none' onChangeText={setName} />
                                    </View>

                                    <Text style={[styles.text_footer, { marginTop: 30 }]}>Date</Text>

                                    <View style={styles.action}>
                                        <FontAwesome name="calendar" color="#05375a" size={20} />
                                        <TouchableOpacity onPress={openDatePicker}>
                                            <Text style={styles.dateStyle}>{startDate ? '' : 'Select date'}</Text>
                                        </TouchableOpacity>
                                        <DatePicker onChangeText={onChange} isVisible={showDatePicker}
                                            mode={'range'} onCancel={onConfirm} onConfirm={onConfirm}
                                            colorOptions={colorOptions}
                                        />

                                        {!!startDate &&
                                            <View>
                                                <Text style={{ color: '#05375a' }}>{startDate} to {endDate}</Text>
                                            </View>}
                                    </View>
                                </View>

                                <View style={[stylesDetails.itemSectionStyle, { justifyContent: 'center' }]}>
                                    <TouchableOpacity style={stylesDetails.styleTakeButton} onPress={() => { onSubmit() }}>
                                        <Icon name='save' style={[stylesDetails.iconStyle, { marginRight: 2 }]} size={19} />
                                        <Text style={{ color: '#009387', paddingTop: 1 }}>submit</Text>
                                    </TouchableOpacity>

                                </View>
                              
                            </View>}
                        </Animatable.View>
                    </View>
                </View>
            </View>
        </Modal>
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
    styleTakeButton: {
        backgroundColor: '#edfcfa',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#abd1ce',
        padding: 4,
        flexDirection: 'row'
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
        position:'fixed'
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

export default DetailsSharedTrip