import React from "react";
import {View, Text} from 'react-native'

export default function Login({navigation}){
    return(
    <View>
        <Text>Faça seu Login ou registre-se.</Text>
        <Text onPress={()=>navigation.navigate ('Registrar')}>Registre-se aqui</Text>

        <Text onPress={()=>navigation.navigate ('Home')}>Entrar aqui</Text>
    
    </View>
    )
}