import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import api from './services/ApiService';
import { Login, Home, Enterprise } from './views';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [login, setLogin] = useState(null);
  useLayoutEffect(() => {
    AsyncStorage.getItem('token')
      .then((token) => {
        api.defaults.headers = {
          ...api.defaults.headers,
          Authorization: `Bearer ${token}`,
        };
        setLogin(true);
      })
      .catch(() => {
        setLogin(false);
      });
  }, []);

  return (
    <NavigationContainer>
      <>
        {login !== null ? (
          <>
            {login ? (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Enterprise" component={Enterprise} />
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Enterprise" component={Enterprise} />
              </Stack.Navigator>
            )}
          </>
        ) : null}
      </>
    </NavigationContainer>
  );
};

export default App;
