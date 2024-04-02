import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Registrar from './src/pages/Registrar/index';
import Home from './src/pages/Home/index';
import Login from './src/pages/Login/index'
import Conteúdo1 from './src/pages/Conteúdo1/index';
import Conteúdo2 from './src/pages/Conteúdo2/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Conteúdo1" component={Conteúdo1} />
      <Drawer.Screen name="Conteúdo2" component={Conteúdo2} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Registrar' component={Registrar} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Home" component={HomeScreen}
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
