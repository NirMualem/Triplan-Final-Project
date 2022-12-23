import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AddDestinationScreen from '../screens/AddDestinationScreen';
import ProfileScreen from '../screens/ProfileScreen';

//Screen names
const homeName = "Home";
const addDestinationName = "Details";
const profileName = "profile";

const Tab = createBottomTabNavigator();

function BottomTabs({ navigation }) {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          "tabBarActiveTintColor": "white",
          "tabBarInactiveTintColor": "#02baac",
          "tabBarActiveBackgroundColor": "#009387",
          "tabBarInactiveBackgroundColor": "#009387",
          "tabBarShowLabel": false,
          "tabBarStyle": [{ "display": "flex" }, {position:'absolute'} ],

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === addDestinationName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}

      >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={addDestinationName} component={AddDestinationScreen} options={{ headerShown: false }} />
        <Tab.Screen name={profileName} component={ProfileScreen} options={{ headerShown: false }}/>

      </Tab.Navigator>
  );
}

export default BottomTabs;