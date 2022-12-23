import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Card, Title, } from 'react-native-paper';
import { Context as AuthContext } from '../../context/AuthContext';

const UserInfo = () => {

  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(state.user);

  return (
    <View>
      <Card>
        <Card.Content>
          <Title style={stylesUserInfo.styleTakeButton}>{user.firstName} {user.lastName}</Title>
          <Text style={{ color: '#009387' }}>{user.email}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

export default UserInfo;


const stylesUserInfo =
{
  styleTakeButton: {
    backgroundColor: '#edfcfa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#abd1ce',
    padding: 4,
    flexDirection: 'row',
    color: '#009387', fontWeight: 'bold'
  }

}