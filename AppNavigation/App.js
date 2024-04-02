import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registrar from './src/pages/Registrar/index'
import Home from './src/pages/Home/index'
import Login from './src/pages/Login/index'


const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Registrar' component={Registrar} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}