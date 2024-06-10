import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage } from 'react-native';

export default function Conteudo1() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const value = await AsyncStorage.getItem('produtos');
                if (value !== null) {
                    setProdutos(JSON.parse(value));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <View>
            <Text>Conteúdo 1</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.nome}</Text>
                        <Text>{item.quantidade}</Text>
                        <Text>{item.validade}</Text>
                    </View>
                )}
            />
        </View>
    );
}
