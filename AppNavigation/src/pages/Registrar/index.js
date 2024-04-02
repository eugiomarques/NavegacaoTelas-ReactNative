import React from "react";
import {View, Text} from 'react-native'

export default function Registrar({navigation}){
    return(
    <View>
        <Text>Faça seu Registro ou entre no seu login.</Text>
        <Text onPress={()=>navigation.navigate ('Login')}>Login</Text>
    </View>
    )
}