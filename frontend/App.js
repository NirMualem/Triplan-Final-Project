import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { MainNavigator } from './src/components/Navigation/StackNavigator';
import { setNavigator } from './src/components/Navigation/NavigationRef';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as BudgetProvider } from './src/context/BudgetContext';
import { Provider as TripProvider } from './src/context/TripContext';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header title = {'Triplan'}/> */}
          <AuthProvider>
              <TripProvider>
                <BudgetProvider>
                  <MainNavigator /> 
                </BudgetProvider>
              </TripProvider>
        </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
