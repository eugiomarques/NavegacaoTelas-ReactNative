import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigation } from "@react-navigation/stack";
import Registrar from './src/pages/Registrar/index'
import Home from './src/pages/Home/index'
import {View, Text} from 'react-native'

const Stack = createStackNavigation();

export default function App(){
  return(
    <><NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Registrar' component={Registrar} />
        <Stack.Screen name='Home' component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
    <View>
        <Text>Login</Text>
    </View></>

  )
}