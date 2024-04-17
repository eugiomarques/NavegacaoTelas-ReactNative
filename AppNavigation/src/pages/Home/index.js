import React from "react";
import {View, Button} from 'react-native'

export default function Home({navigation, route}){
    return(
    <View>
        <Button onPress = {()=>navigation.navigate("Perfil")} title = 'Perfil'/>
        <Button onPress = {()=>route.params.funcLogar(false)} title='Sair'/>
    </View>
    )
}                       