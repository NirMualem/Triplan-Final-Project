import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useValidation } from 'react-native-form-validator';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as TripContext } from '../../context/TripContext';
import { styles } from "../ComponentStyle";
import DatePicker from 'react-native-neat-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from '@react-navigation/native';

export default function AddDestinationScreen({ navigation }) {

    const { createTrip } = useContext(TripContext);
    const { state } = useContext(AuthContext);
    const [user, setUser] = useState(state.user);
    const _id = user._id;
    const isFocused = useIsFocused();
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryKey, setCountryKey] = useState(null);
    const [city, setCity] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceCity, setDataSourceCity] = useState([]);
    const [disableCity, setDisableCity] = useState(true);
    const { validate } = useValidation({ state: { name, country ,startDate, endDate } });

    useEffect(() => {
        fetch("http://localhost:3001/country")  // **Api for fetching**
            .then(response => response.json())
            .then((responseJson) => {
                setLoading(false);
                setDataSource(responseJson);
            });
    }, [isFocused]);

    const updateCities = () => {
        console.log(countryKey);
        fetch(`http://localhost:3001/city?country=${countryKey}`)  // **Api for fetching**
            .then(response => response.json())
            .then((responseJson) => {
                setLoading(false);
                setDataSourceCity(responseJson);
                setDisableCity(false);
            });

    }


    const renderLabel = () => {
        if (country || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    const colorOptions = {
        headerColor: '#009387',
        weekDaysColor: '#009387',
        selectedDateBackgroundColor: '#009387'
    }
    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onChange = () => {
        // You should close the modal in here
        setShowDatePicker(false)
    }

    const onClose = () => {
        if (!(startDate && endDate)) {
            setStartDate('')
            setEndDate('')
        }
        setShowDatePicker(false)
    }


    const onConfirm = (date) => {
        setStartDate(date.startDateString)
        setEndDate(date.endDateString)
        setShowDatePicker(false)
    }
    
    const onSubmitPress = () => {
        setLoading(true);
        if (validate({
                country: { required: true }, //Check if a state variable is not empty.
                startDate: { required: true },
                endDate: { required: true },
            }))

        createTrip({ _id, name, country, city, startDate, endDate, navigation });
    };

    const swapDateOrder = (date) => {
        return date.split("-")[2] + '/' + date.split("-")[1] + '/' + date.split("-")[0];
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Choose your destination</Text>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" >

                {/*country */}
                <Text style={styles.text_footer}>Name Your Trip</Text>

                <View style={styles.action}>
                    <FontAwesome name="globe" color="#05375a" size={20} />
                    <TextInput placeholder='Your trip name'
                        style={styles.textInput} autoCapitalize='none' onChangeText={setName} />
                </View>

                {/*country */}
                <Text style={[styles.text_footer, { marginTop: 30 }]}>Country</Text>
                <View style={styles.action}>
                    <FontAwesome name="globe" color="#05375a" size={20} />
                     <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSoearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataSource}
                        maxHeight={300}
                        labelField='name'
                        valueField='name'
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={country}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCountry(item.name);
                            setIsFocus(false);
                            setLoading(true);
                            setCountryKey(item.isoCode)
                            updateCities();
                        }}
                    /> 
                </View>

                {/*city */}
                <Text style={[styles.text_footer, { marginTop: 30 }]}>City</Text>
                <View style={styles.action}>
                    <FontAwesome name="globe" color="#05375a" size={20} />
                    <TextInput placeholder='Your city'
                        style={styles.textInput} autoCapitalize='none' onChangeText={setCity} />
                </View>

                {/* Date */}
                <Text style={[styles.text_footer, { marginTop: 30 }]}>Date</Text>

                <View style={styles.action}>
                    <FontAwesome name="calendar" color="#05375a" size={20} />
                    <TouchableOpacity onPress={openDatePicker}>
                        <Text style={styles.dateStyle}>{startDate ? '' : 'Select date'}</Text>
                    </TouchableOpacity>
                    <DatePicker onChangeText={onChange} isVisible={showDatePicker}
                        mode={'range'} onCancel={onClose} onBackdropPress={onClose} onConfirm={onConfirm}
                        colorOptions={colorOptions}
                    />
                    {!!startDate &&
                        <View>
                            <Text style={{ color: '#05375a' }}>{swapDateOrder(startDate)} to {swapDateOrder(endDate)}</Text>
                        </View>}
                </View>

                <View style={styles.button}>
                {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={{ height: 50, width: 50 }} /> :
                    <TouchableOpacity style={styles.signIn} onPress={onSubmitPress} >
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text style={[styles.textSign, { color: '#fff' }]}>Add destination</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
                </View>
            </Animatable.View>

        </View>
    );
}