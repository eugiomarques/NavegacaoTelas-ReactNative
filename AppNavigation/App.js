import React from "react";
import {useState} from 'react';
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


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} initialParams = {{funcLogar : setLogado}}/>
      <Drawer.Screen name="Conteúdo 1" component={Conteúdo1} />
      <Drawer.Screen name="Conteúdo 2" component={Conteúdo2} />
    </Drawer.Navigator>
  );
}

function HomeScreenBottom() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Avisos" component={Avisos} />
    </Tab.Navigator>   
  );
}

function App() {
  const [EstaLogado, setLogado] = useState(false);
  return (
    EstaLogado?(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreenBottom} initialParams = {{funcLogar : setLogado}} options={{headerShown:false}}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
        <Stack.Screen name="Avisos" component={Avisos}/>
      </Stack.Navigator>
    </NavigationContainer>
    ):(
      <NavigationContainer>	 		
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} initialParams = {{funcLogar : setLogado}}/>
          <Stack.Screen name="Registrar" component={Registrar}/>    
        </Stack.Navigator>    
    </NavigationContainer>))
}

export default App;
