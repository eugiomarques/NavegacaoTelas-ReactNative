import React from "react";
import {View, Text} from 'react-native'

export default function Home({navigation}){
    return(
    <View>
        <Text onPress={()=>navigation.navigate ('Perfil')}>Perfil</Text>
    </View>
    )
}                   