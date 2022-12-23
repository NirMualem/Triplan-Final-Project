

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';
import { styles } from "../ComponentStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import data from './AttractionsTypes.json';

export const AttractionSearchStepOne = ({ areaOfAttraction, setAreaOfAttraction, typeOfAttraction, setTypeOfAttraction }) => {

   const [other, setOther] = useState(false);
   const [attr, setAttr] = useState(typeOfAttraction);

   const checkFreeSearch = async (e) => {
      setAttr(e.value);
      await setTypeOfAttraction(e.lable);
      e.value === '1' ? setOther(true) : setOther(false);
   }

   const updateArea = async (e) => {
      await setAreaOfAttraction(e);
   }

   return (
      <View>
         <View style={[styles.action, { alignItems: 'center' }]} >
            <Icon name='compass' size={22} style={StepOneStyles.locationIcon} />
            <Text style={[styles.text_footer, {margin:0, paddingVertical:5}]} > Location </Text>
            < TextInput placeholder='Enter area/city/location' style={[StepOneStyles.locationInputText,{paddingVertical:5}]}
               autoCapitalize='none' value={areaOfAttraction}
               onChangeText={updateArea} />
         </View>
         <View style={styles.action}>
            <Icon name='ticket' size={22} style={StepOneStyles.locationIcon} />
            <Text style={styles.text_footer} > Type </Text>
            <Dropdown
               style={StepOneStyles.dropdown}
               placeholderStyle={StepOneStyles.placeholderStyle}
               selectedTextStyle={StepOneStyles.selectedTextStyle}
               iconStyle={StepOneStyles.iconStyle}
               data={data}
               maxHeight={200}
               value={attr || ""}
               valueField="value"
               labelField="lable"
               placeholder="Select attraction type"
               searchPlaceholder="Search..."
               onChange={checkFreeSearch}
            />
         </View>

         {other && <View style={styles.action} >
            <Icon name='plus' size={22} style={StepOneStyles.locationIcon} />
            <Text style={styles.text_footer} > Other </Text>
            <TextInput placeholder='Enter attraction type' style={StepOneStyles.locationInputText}
               autoCapitalize='none' value={typeOfAttraction}
               onChangeText={(e) => { setTypeOfAttraction(e) }} />
         </View>}
      </View>
   );
}

const StepOneStyles = StyleSheet.create({
   locationInputText: {
      flex: 1,
      paddingLeft: 10,
      paddingVertical: 2,
      color: '#05375a',
      marginHorizontal: 10,
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 8
   },
   locationIcon: {
      alignItems: 'baseline',
      paddingRight: 3,
      marginLeft: 1,
      color: '#05375a',
      marginTop: 4
   },
   dropdown: {
      margin: 5,
      // height: 50,
      width: 180,
      backgroundColor: '#EEEEEE',
      borderRadius: 8,
      paddingHorizontal: 8,


   },
   placeholderStyle: {
      fontSize: 14,
      textAlign: 'center',
   },
   selectedTextStyle: {
      fontSize: 14,
      textAlign: 'center',
      color: '#05375a',
   },
   iconStyle: {
      width: 20,
      height: 20,
   },

});

export default AttractionSearchStepOne;
