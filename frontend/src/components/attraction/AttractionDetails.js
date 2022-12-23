import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../ComponentStyle';
import { Input } from 'react-native-elements';
import { Context as TripContext } from '../../context/TripContext';
import { Dropdown } from 'react-native-element-dropdown';

const AttractionDetails = ({ attraction, start, setStart, end, setEnd, description, setDescription, dayPickId, setDayPickId }) => {

  const { state } = useContext(TripContext);
  const [isFocus, setIsFocus] = useState(false);
  const updateDay = (e) => {
    console.log(e._id);
    setDayPickId(e._id);
    setIsFocus(false);

  }

  return (
    <ScrollView style={stylesAttraction.viewStyle}>
      <View style={{ padding: 3, alignItems: 'center' }}>
        {!!attraction && <Text style={stylesAttraction.title} >{attraction.name}</Text>}
        <View style={stylesAttraction.line} />
      </View>

      <View style={{ padding: 3 }}>
        <Text style={stylesAttraction.text}>Address:</Text>
        {!!attraction && <Text style={{ paddingHorizontal: 3 }}>{attraction.formatted_address}</Text>}
      </View>

      <View style={{ padding: 3 }}>
        <Text style={stylesAttraction.text} >Day:</Text>
        <Dropdown style={[dropDownStyles.dropdown, isFocus && { borderColor: "#abd1ce" }]}
          placeholderStyle={dropDownStyles.placeholderStyle}
          selectedTextStyle={dropDownStyles.selectedTextStyle}
          inputSearchStyle={dropDownStyles.inputSearchStyle}
          iconStyle={dropDownStyles.iconStyle}
          data={state.days}
          maxHeight={200}
          labelField="title"
          valueField="_id"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={!isFocus ? 'Select item' : '...'}
          onChange={updateDay}
        />
      </View>


      <View style={{ padding: 3 }}>
        <Text style={stylesAttraction.text} >Start time:</Text>
        <TextInput style={{ marginBottom: 4, padding: 6 }} placeholder='HH:MM' type="time"
          autoCapitalize='none' value={start}
          onChangeText={setStart} />
      </View>

      <View style={{ padding: 3 }}>
        <Text style={stylesAttraction.text} >End time:</Text>
        <TextInput style={{ marginBottom: 4, padding: 6 }} placeholder='HH:MM' type="time"
          autoCapitalize='none' value={end}
          onChangeText={setEnd} />
      </View>

      <View style={{ padding: 3 }}>
        <Text style={stylesAttraction.text} >Description:</Text>
        <TextInput style={{ marginBottom: 4, padding: 6 }} placeholder='Additional comments'
          value={description}
          onChangeText={setDescription} />
      </View>
    </ScrollView >
  )
};

const dropDownStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8, marginHorizontal: 3
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    // top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

const stylesAttraction = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009387',
    marginHorizontal: 6,
    paddingBottom: 4
  },
  text: {
    fontWeight: 'bold',
    color: '#29c2b9',
    paddingBottom: 4, fontSize: 16
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

  viewStyle: {
    shadowColor: "black",
    borderColor: "#abd1ce",
    borderRadius: 6,
    borderWidth: 4,
    padding: 4,
    paddingBottom: 8,
    margin: 4,
    flex: 1,
    maxHeight: 270,
    // bottom: 10,

    width: '100%',
  },
});

export default AttractionDetails;
