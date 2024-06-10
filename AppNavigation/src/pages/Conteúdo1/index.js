import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Conteudo1() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const produtosJSON = await AsyncStorage.getItem('produtos');
                if (produtosJSON !== null) {
                    setProdutos(JSON.parse(produtosJSON));
                }
            } catch (error) {
                alert('Erro ao buscar os produtos.');
            }
        };

        fetchProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produtos Cadastrados</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.nome}</Text>
                        <Text style={styles.cell}>{item.quantidade}</Text>
                        <Text style={styles.cell}>{item.validade}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    cell: {
        flex: 1,
        fontSize: 16,
    },
});
