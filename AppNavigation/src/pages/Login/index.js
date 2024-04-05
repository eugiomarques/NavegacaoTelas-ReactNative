import React from "react";
import {View, Text, Button} from 'react-native'

export default function Login({navigation, route}){
    return(
    <View>
        <Button onPress = {()=>route.params.funcLogar(true)} title='Logar'/>
        <Button onPress = {()=>navigation.navigate("Registrar")} title = 'Registrar'/>
    </View>
    )
}