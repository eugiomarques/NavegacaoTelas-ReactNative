import React from "react";
import {View, Text} from 'react-native'

export default function Home({navigation}){
    return(
    <View>
        <Text onPress={()=>navigation.navigate ('Perfil')}>Perfil</Text>
        <Text onPress={()=>navigation.navigate ('Login')}>Voltar Login</Text>
    </View>
    )
}                       