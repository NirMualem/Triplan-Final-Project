import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Context as TripContext } from '../../context/TripContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { styles } from '../ComponentStyle';
import { useNavigation } from '@react-navigation/native';

export default function TripMenu({ _id, share }) {
  const { deleteTrip, shareTrip } = useContext(TripContext);
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(share);

  const navigation = useNavigation();

  const hideMenu = () => {
    setVisible(false);
  }

  const showMenu = () => setVisible(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onShare = () => {

    shareTrip({ tripId: _id });
  };

  const onEdit = () => {
    setVisible(false);
    navigation.navigate("AttractionDivision", { _id: _id });
  }

  const onDelete = () => {
    setVisible(false);
    deleteTrip({ tripId: _id });
  };

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Menu 
        visible={visible}
        anchor={
          <Button onPress={showMenu} pressColor={"#abd1ce"} >
            <Icon name='dots-vertical' size={20} style={{ color: "#009387"}} />
          </Button>}
        onRequestClose={hideMenu} >
        <MenuItem onPress={onShare} pressColor={"#abd1ce"}>Share
          <Switch trackColor={{ false: "#767577", true: "#abd1ce" }} thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} onValueChange={toggleSwitch} value={isEnabled} style={{marginLeft:15}} />
        </MenuItem>
        <MenuItem onPress={onEdit} pressColor={"#abd1ce"}>Edit</MenuItem>
        <MenuDivider />
        <MenuItem onPress={onDelete} pressColor={"#ff7f7f"}>Delete</MenuItem>
      </Menu>
    </View>
  );
}