import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Avatar, Icon } from 'react-native-elements';
import fetchApi from '../../api/fetchAPI';
import { styles } from '../ComponentStyle';
import * as ImagePicker from 'expo-image-picker';

const ProfileImage = () => {

  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(state.user);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  let _id = user._id;
  let buf = Buffer.from(user.image.data);
  let source = buf.toString('utf8');

  async function changeImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    try {

      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
      });

      let localUri = image.uri;
      setUser({ image: { data: localUri } });
      const response = await fetchApi.put('/updateImage', { localUri, _id }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
        }
      }).catch(err => { throw err });

    }
    catch (err) {

    }
  }

  return (
    <View style={styles.ProfileImage}>
      <TouchableOpacity onPress={() => { setImageModalVisible(!imageModalVisible) }}>
        <View >
          <Avatar source={{ uri: source }} size={100} rounded />
        </View>

        <Modal animationType="fade" transparent={true} visible={imageModalVisible}
          onRequestClose={() => { setImageModalVisible(!imageModalVisible); }}>
          <View style={styles.imageModal}>
            <Avatar source={{ uri: source }} size={300} />
            <TouchableOpacity onPress={changeImage} style={styles.imageModalEdit}>
              <Icon name='edit' size={200} color={'rgba(255,255,255,0.5)'} />
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity >
    </View>
  );
}

export default ProfileImage;