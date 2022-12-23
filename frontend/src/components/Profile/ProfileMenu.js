import React, { useState, useContext } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { Context as AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { slide as Menu } from 'react-burger-menu';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native-animatable';

const ProfileMenu = (props) => {

  const { state, signOut, deleteAccount } = useContext(AuthContext);
  const [email, setEmail] = useState(state.user.email);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigation = useNavigation();
  return (
    <Menu styles={styles}>
      <TouchableOpacity onPress={() => { setInfoModalVisible(!infoModalVisible) }}>
        <Icon name='infocirlceo' size={20} />
        <Text style={styles.text}>About Us</Text>


        <Modal animationType="fade" transparent={true} visible={infoModalVisible}
          onRequestClose={() => { setInfoModalVisible(!infoModalVisible); }} >
          <Card style={styles.modal}>
            <Card.Title title="Triplan - About Us" />
            <Card.Content>
              <Paragraph>This app was developed as a Computer Science last year's project.
                We did our best to provide the greatest expirence for the user.
                It was created with NodeJS and React Native.
                Creators: Nir Mualem, Hadas Alia, Noy Tal Gelfand. We hope you enjoy!
              </Paragraph>
            </Card.Content>
          </Card>
        </Modal>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { signOut({ navigation }) }}>
        <Icon name='logout' size={20} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity onPress={() => { setDeleteModalVisible(!deleteModalVisible) }}>
        <Icon name='frowno' size={20} />
        <Text style={[styles.text, { color: 'red' }]}>Delete Acount</Text>

        <Modal animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => { setDeleteModalVisible(!deleteModalVisible); }}>

          <Card style={{
            borderRadius: 8, borderColor: '#009387', borderWidth: 3, justifyContent: "center", marginTop: 300,
            alignItems: "center",
          }}>
            <Card.Title title="Are you sure?" />
            <Card.Content style={styles.confirmBox}>
              <TouchableOpacity onPress={() => { deleteAccount({ navigation, email }) }} ><Text style={styles.text}>Yes</Text></TouchableOpacity>
              <View style={styles.space} />
              <TouchableOpacity onPress={() => { setDeleteModalVisible(!deleteModalVisible); }}><Text style={styles.text}>No</Text></TouchableOpacity>
            </Card.Content>
          </Card>
        </Modal>
      </TouchableOpacity>

    </Menu >
  );
}

let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '24px',
    left: '30px',
    top: '30px',
    
  },
  bmBurgerBars: {
    background: 'white',
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    width: '50%'
  },
  bmMenu: {
    overflow: 'hidden',
    background: '#e3f4f3',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#abd1ce',
    padding: '0.8em'
  },
  bmItem: {
    paddingTop: 30
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  text: {
    fontSize: 16,
    paddingLeft: 3,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  confirmBox: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },
  space: {
    width: 20,
    height: 20,
  },
}

export default ProfileMenu;
