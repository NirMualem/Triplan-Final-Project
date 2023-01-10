import * as React from 'react';
//for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
//all the screens in our app to navigate between
import { LoginScreen } from '../Login/LoginScreen';
import { SignUpScreen } from '../Login/SignUpScreen';
import OpeningScreen from '../screens/OpeningScreen';
import AttractionDivision from '../screens/AttractionDivision';
import BottomTabs from "./BottomTabs";
import BudgetScreen from '../budget/BudgetScreen'
import AddDestinationScreen from '../screens/AddDestinationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator>
      <Stack.Screen name="OpeningScreen" component={OpeningScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Budget" component={BudgetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Destination" component={AddDestinationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign In" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AttractionDivision" component={AttractionDivision} options={{ headerShown: false }} />
        <Stack.Screen name="tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
