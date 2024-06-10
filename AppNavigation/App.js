import React, { useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Registrar from './src/pages/Registrar/index';
import Home from './src/pages/Home/index';
import Login from './src/pages/Login/index'
import Conteúdo1 from './src/pages/Conteúdo1/index';
import Conteúdo2 from './src/pages/Conteúdo2/index';
import Perfil from './src/pages/Perfil/index';
import Avisos from "./src/pages/Avisos/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Conteúdo 1" component={Conteúdo1} />
      <Drawer.Screen name="Conteúdo 2" component={Conteúdo2} />
    </Drawer.Navigator>
  );
}

function HomeScreenBottom() {
  const [hasNotifications, setHasNotifications] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkNotifications = async () => {
        const produtosJSON = await AsyncStorage.getItem('produtos');
        if (produtosJSON !== null) {
          let produtosArray = JSON.parse(produtosJSON);
          const today = new Date();
          const hasNotifications = produtosArray.some(produto => {
            const expiryDate = new Date(produto.validade.split('/').reverse().join('-'));
            return expiryDate.getFullYear() === today.getFullYear() && expiryDate.getMonth() === today.getMonth();
          });
          setHasNotifications(hasNotifications);
        }
      };

      checkNotifications();
    }, [])
  );

  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Avisos" component={Avisos} options={{ tabBarBadge: hasNotifications ? '!' : null }}/>
    </Tab.Navigator>   
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Registrar' component={Registrar} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Home" component={HomeScreenBottom}
        options={{ headerShown: false }}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
        <Stack.Screen name="Avisos" component={Avisos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
