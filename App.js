//Bibliotecas para navegação entre as telas
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

//Telas
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';
import Opening from './src/screens/Opening';
import CreateGroup from './src/screens/CreateGroup';
import Home from './src/screens/Home';
import Group from './src/screens/Group';

//Gerencia a navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Opening'>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Opening" component={Opening} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> 
        <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: false}} />
        <Stack.Screen name="Group" component={Group} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}